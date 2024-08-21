import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {

    
    //this hook give us access to our queryClient
    const queryClient = useQueryClient();
    
    //The way reactQuery works is with the useMutation hook, where we can call our api functions to work with our database
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        //inside mutationFn: we call the method to use
        mutationFn: deleteCabinApi,
        //Since altering our bbdd does not change any of our states, it will no re-fetch itself the component, for that we can use
        //onSuccess to invalidate the cache and force the app to re-fetch it using queryClient and "invalidateQueris"
        onSuccess: () => {
            toast.success("Cabin succesfully deleted");
            queryClient.invalidateQueries({
                //here we specify the exact data we want to invalidate, using the keys defined on our queryClient
                queryKey: ["cabin"],
            });
        },
    onError: (err) => toast.error(err.message),
    });

    return {isDeleting, deleteCabin};
}