import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function usePostMutation<TBody, TResult>(
    url: string,
    options?: Omit<UseMutationOptions<TResult, Error, TBody>, "mutationFn">
) {
    return useMutation<TResult, Error, TBody>({
        mutationFn: async (body: TBody) => {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            return res.json() as Promise<TResult>;
        },
        ...options,
    });
}