import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export const getUserProfileImage = async (userId) => {
    try {
        const storage = getStorage(); // Obtenir une référence à l'espace de stockage Firebase
        const imagePath = `user_images/${userId}/profile.jpg`;
        console.log("imagePath", imagePath);
        const imageRef = storageRef(storage, imagePath); // Obtenir une référence à l'image dans le stockage Firebase
        console.log("imageRef", imageRef);
        const imageUrl = await getDownloadURL(imageRef); // Récupérer l'URL de téléchargement de l'image
        console.log("imageUrl", imageUrl);
        return imageUrl;
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            // Gérer le cas où l'objet n'est pas trouvé dans Firebase Storage
            console.error("L'image de profil n'a pas été trouvée dans Firebase Storage.");
            return null;
        } else {
            // Gérer d'autres erreurs
            console.error("Erreur lors de la récupération de l'URL de l'image de profil :", error);
            return null;
        }
    }
};

