import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl) 
  
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://tbvofqkyqlsddezzfidy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //1. create cabin
  let query = supabase.from('cabins')
  // A. create cabin  
  if(!id)
   query = query
    .insert([{ ...newCabin, image: imagePath }])
  
  // B  edit cabin
  if(id){
    query = query.update({...newCabin, image: imagePath}).eq('id', id)
  }


  const {data, error} = await query.select().single() 
  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2. Upload image

   if(hasImagePath) return data 

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function updateCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("id", newCabin.id)
    .select();

  if (error) throw new Error("Cabin could not be updated");

  return data;
}
