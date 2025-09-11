import { isRedirectError } from 'next/dist/client/components/redirect-error';

type Options<T> = {
  actionFn: () => Promise<T>;
};

export const executeAction = async <T>({ actionFn }: Options<T>) => {
  try {
    return await actionFn();
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error('Something went wrong.');
  }
};
