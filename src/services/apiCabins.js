import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
    
    let { data: cabins, error } = await supabase.from('cabins').select('*');

    if(error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return cabins;
}

export async function createEditCabin(newCabin, id) {
//Here we check if the image already exists in Supabase, so we dont upload the same image again and reuse it
    console.log(newCabin);
    const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

//Need to make sure that the name is unique and Supabase creates folders based on "/", thats wh we replace them"
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //*** 1. Create cabin ****
    let query = supabase.from('cabins');
   
//for the insert to work, newCabin has to have the same structure as our table in supabase 
    if(!id) {
         query = query.insert([{...newCabin, image: imagePath}]);
    } else {
         query = query.update({...newCabin, image: imagePath}).eq("id", id);
    }

// This way we select the last object created/updated
    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be created");
    }

    //**** 2. Upload Image ****/
    if(hasImagePath) return data;

    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

    //**** 3. Delete the cabin IF there was an error uploading his image ****/
    if (storageError) {
        // Handle error
        await supabase.from('cabins').delete().eq("id", data.id);
        console.error(storageError);
        throw new Error("Image could not be uploaded and cabin was not be created")
    }

    return data;
}

export async function deleteCabin(id) {
    
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;

}