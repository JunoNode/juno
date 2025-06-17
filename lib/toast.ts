import { toast } from 'react-hot-toast';

export const notifyRefresh = () => toast.success('🔄 Wallet refreshed');
export const notifyError = (msg = 'Something went wrong') => toast.error(`🚫 ${msg}`);
export const notifySuccess = (msg: string) => toast.success(`✅ ${msg}`);
export const notifyInfo = (msg: string) => toast(msg);

<Toaster position="top-right" />

onRefresh={() => {
  notifyRefresh();
}}
