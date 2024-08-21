import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => {
            //Here we can set into the key "user", the data so we have it in the cache, to improve performance
            queryClient.setQueryData(["user"], user.user)
            toast.success("Welcome");
            navigate("/dashboard", {replace: true});
        },
        onError: (err) => {
            console.log("Error", err);
            toast.error("Email or password incorrect")
        }
    });

    return {login, isLoading};
}