# Papiness App

## TO DO LIST (2024-6-9)

in order :

x only display document button on homepage if one or more is missing (local database for improvement)
x Pre fill the presentation and center of interest ... on the profilescreen
- Add future and more importantly past visits on visitsscreen
- debug ponctuals visits, watch out for the dates
- See wich parameters to keep on profilescreen
- ADD LOCAL DATABASE !!
- Optimize the charging of homepage
- Fix bottomtab navigator warn
-(see if not too hard to switch screens by scrolling)

Il n’y a que le dossier app qui est vraiment important (le dossier assets contient juste les images, functions ne sert a rien je crois qu’il est apparu quand j’ai essaye de host des fonctions sur firebase pour utiliser stripe). Dans le fichier app, il y a classique le fichier style, j’ai essaye de faire un ficher global + des fichiers pour chaque page je sais pas si c’est la meilleure stratégie, il faut supprimer le fichier image, les functions pareil un fichier par groupe d’écran +/- et enfin les screens qui sont ranges par groupe d’ecran.
Le fichier qui lie tous les screens et le fichier App.tsx dans la racine, on y import tous les écrans, quand on ouvre l’appli on tombe d’abord sur le premier écran de Stack.Navigator (ici InitialLoading) et ensuite on la redirection se fait sur les screens avec le combo.

import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();
navigation.navigate('FirstPage');

C’est un peu le seul truc qu’il faut savoir sur react, apres les fonctions dans functions doivent etre assez bien documentées. J’espère que j’ai laisse un truc qui marche

Pour lancer l’émulateur, j’utilisais expo go (faire npx expo start dans le fichier du projet mais vous regarderez des tutos). Et la moi j’étais reste avec expo go et j’avais eu un soucis parce qu’on peut pas avoir accès a toutes les librairies et donc il faut passer en développment build, c’est pour ca qu’a ce moment j’ai essaye en natif. Ca c’est moins important on regardera ensemble
