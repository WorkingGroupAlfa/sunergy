import { promises as fs } from 'fs';
import path from 'path';
import { defaultAdminState, normalizeAdminState, withAdminStateTimestamp, type AdminState } from '@/lib/admin-state';

const DEFAULT_DATA_FILE = path.join(process.cwd(), 'data', 'admin-state.json');
const DATA_FILE = process.env.SUNERGY_ADMIN_DATA_FILE
  ? path.resolve(process.env.SUNERGY_ADMIN_DATA_FILE)
  : DEFAULT_DATA_FILE;
const REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const REDIS_ADMIN_STATE_KEY = 'sunergy:admin-state';

let memoryState: AdminState | null = null;

function getUpdatedAtTime(value: string | undefined) {
  if (!value) return 0;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

async function redisCommand<T>(command: unknown[]) {
  if (!REDIS_REST_URL || !REDIS_REST_TOKEN) return null;

  const response = await fetch(REDIS_REST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Redis command failed with ${response.status}`);
  }

  const body = (await response.json()) as { result?: T; error?: string };
  if (body.error) {
    throw new Error(body.error);
  }

  return body.result ?? null;
}

async function readRedisState() {
  try {
    const raw = await redisCommand<string | null>(['GET', REDIS_ADMIN_STATE_KEY]);
    if (!raw) return null;

    return normalizeAdminState(JSON.parse(raw) as Partial<AdminState>);
  } catch (error) {
    console.warn('Unable to read admin state from Redis:', error);
    return null;
  }
}

async function writeRedisState(state: AdminState) {
  if (!REDIS_REST_URL || !REDIS_REST_TOKEN) return false;

  await redisCommand(['SET', REDIS_ADMIN_STATE_KEY, JSON.stringify(state)]);
  return true;
}

async function readFileState() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return normalizeAdminState(JSON.parse(raw) as Partial<AdminState>);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn('Unable to read admin state file:', error);
    }
    return null;
  }
}

async function writeFileState(state: AdminState) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

export async function readAdminState() {
  const redisState = await readRedisState();
  if (redisState) {
    memoryState = redisState;
    return redisState;
  }

  if (memoryState) return normalizeAdminState(memoryState);

  const fileState = await readFileState();
  memoryState = fileState ?? normalizeAdminState(defaultAdminState);

  return memoryState;
}

export async function writeAdminState(state: Partial<AdminState>) {
  const currentState = await readAdminState();
  const incomingTime = getUpdatedAtTime(state.updatedAt);
  const currentTime = getUpdatedAtTime(currentState.updatedAt);

  if (incomingTime > 0 && currentTime > incomingTime) {
    return currentState;
  }

  const nextState = withAdminStateTimestamp(
    {
      ...currentState,
      ...state,
      homeContent: state.homeContent ? { ...currentState.homeContent, ...state.homeContent } : currentState.homeContent,
      aboutContent: state.aboutContent ? { ...currentState.aboutContent, ...state.aboutContent } : currentState.aboutContent,
    },
    incomingTime > 0 ? state.updatedAt : undefined
  );
  memoryState = nextState;

  try {
    const redisSaved = await writeRedisState(nextState);
    if (redisSaved) return nextState;
  } catch (error) {
    console.warn('Unable to persist admin state to Redis; falling back to file/memory:', error);
  }

  try {
    await writeFileState(nextState);
  } catch (error) {
    console.warn('Unable to persist admin state file; keeping in memory for this server instance:', error);
  }

  return nextState;
}
