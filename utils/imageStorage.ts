import * as FileSystem from 'expo-file-system';

export const ensureTripFolder = async (
  tripId: string
): Promise<string> => {
  const dir =
    FileSystem.Paths.document.uri +
    `trips/${tripId}/`;

  const dirInfo =
    await FileSystem.getInfoAsync(dir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      dir,
      {
        intermediates: true,
      }
    );
  }

  return dir;
};

export const saveImageToTrip =
  async (
    uri: string,
    tripId: string
  ): Promise<string> => {
    const folder =
      await ensureTripFolder(tripId);

    const filename =
      uri.split('/').pop() ||
      'photo.jpg';

    const destination =
      folder + filename;

    await FileSystem.copyAsync({
      from: uri,
      to: destination,
    });

    return destination;
  };

export const deleteImage = async (
  uri: string
): Promise<void> => {
  await FileSystem.deleteAsync(uri, {
    idempotent: true,
  });
};