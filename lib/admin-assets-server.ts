import { uploadAdminAssetState } from '@/lib/admin-state-server';

export async function uploadAdminAsset(file: File) {
  return uploadAdminAssetState(file);
}
