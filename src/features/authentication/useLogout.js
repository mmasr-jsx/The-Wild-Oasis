import { useMutation, useQueryClient } from "@tanstack/react-query";
import {logout as logoutApi} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            //since we stored the user in the chache, to avoid security breachs, we HAVE to clean up the cached data of user once logged out
            queryClient.removeQueries();
            //With "replace: true", we erase the trace so we cant go back and force the user to login again
            navigate("/login", {replace: true})
        }
    });

    return {logout, isLoading}
}