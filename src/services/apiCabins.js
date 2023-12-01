import supabase, { SUPABASE_URL } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error('Cabings could not be loaded...');

    throw new Error('Cabings could not be loaded...');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(SUPABASE_URL);
  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  //1: create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //1: edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error('Cabings could not be inserted...');

    throw new Error('Cabings could not be inserted...');
  }

  //2: upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3: delete cabin if does not uploading image to storage
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.error(storageError);
    throw new Error('Cabin Image upload problem, Pls try later...');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('There is something error to delete...');
  }

  return data;
}
