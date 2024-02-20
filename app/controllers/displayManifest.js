import { getAllManifests, getSingleManifest } from "../services/databaseFunctions.js";

const getAllDocumentsController = async (req, res) => {
  const manifests = await getAllManifests();

  try {
    if (manifests.length === 0) {
      return res.status(200).json({ message: "Manifests do not exist" });
    }
    return res.status(200).json({ message: manifests });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getSingleDocumentController = async (req, res) => {
  const manifest = await getSingleManifest(req.params.id);

  try {
    if (manifest === null) {
      return res.status(404).json({ message: "Manifest does not exist" });
    }

    return res.status(200).json({ message: manifest });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { getAllDocumentsController, getSingleDocumentController };
