import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;

// Créer un singleton en utilisant des propriétés et des méthodes statiques

class ImageToTextPipeline {
  static task = "image-to-text";
  static model = "Xenova/texify";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      try {
        this.instance = pipeline(this.task, this.model, { progress_callback });
      } catch (err) {
        console.error("Error initializing pipeline", err);
        self.postMessage({ status: "error", message: err.message });
      }
    }

    return this.instance;
  }
}

/* Ajout un eventListener à l'objet self du worker (similaire à l'objet globalThis ou window)
 * Utiliser la méthode postMessage pour communiquer avec le thread principal.
 */

self.addEventListener("message", async (event) => {
  try {
    let imageToText = await ImageToTextPipeline.getInstance((x) => {
      self.postMessage(x);
    });

    if (!imageToText) throw new Error("Failed to initialize pipeline");

    const output = await imageToText(event.data.image);

    self.postMessage({ status: "complete", output });
  } catch (err) {
    self.postMessage({ status: "error", message: err.message });
  }
});
