export const getPreview = async () => {
  try {
    const data: { type: string; id: string; img?: string } = await fetch(
      '/media'
    ).then((data) => data.json());

    return data;
  } catch (e) {
    return null;
  }
};
