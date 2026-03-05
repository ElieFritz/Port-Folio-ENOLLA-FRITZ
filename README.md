# Portfolio Enolla - Modifier les images et les videos

Ce portfolio est concu pour permettre la mise a jour des visuels sans modifier les composants Next.js.

La majeure partie du contenu se gere de deux manieres :

1. En remplacant directement les fichiers dans `public/images/...`
2. En modifiant les chemins, textes et liens dans `content/portfolio-content.json`

L'interface d'administration est disponible sur `http://localhost:3000/admin` et permet de modifier rapidement le contenu JSON.

## 1. Lancer le projet

En local :

```bash
npm run dev
```

Puis ouvrir :

```text
http://localhost:3000
```

Admin :

```text
http://localhost:3000/admin
```

## 2. Modifier la photo du proprietaire

Photo actuelle :

```text
public/images/profile/enolla-owner.jpg
```

Deux options :

1. Remplacer ce fichier par une nouvelle image avec le meme nom
2. Utiliser un autre nom de fichier et mettre a jour le JSON

Champ a verifier dans `content/portfolio-content.json` :

```json
"hero": {
  "profileImage": {
    "src": "/images/profile/enolla-owner.jpg"
  }
}
```

Si vous gardez le meme chemin, aucun autre changement n'est necessaire.

## 3. Modifier les images des projets

Chaque projet utilise un dossier dedie dans :

```text
public/images/projects/
```

Exemple :

```text
public/images/projects/lumina-africa/
public/images/projects/hublots/
public/images/projects/boost-performers/
public/images/projects/sawa-rh/
public/images/projects/ln-foot/
public/images/projects/wearing-mind/
```

Dans chaque dossier, vous pouvez remplacer :

```text
cover.jpg
screen-1.jpg
screen-2.jpg
```

Le contenu associe est pilote par `content/portfolio-content.json` dans chaque objet projet :

```json
{
  "slug": "wearing-mind",
  "coverImage": "/images/projects/wearing-mind/cover.jpg",
  "heroImage": "/images/projects/wearing-mind/cover.jpg",
  "images": [
    "/images/projects/wearing-mind/screen-1.jpg",
    "/images/projects/wearing-mind/screen-2.jpg"
  ]
}
```

Pour mettre a jour un projet :

1. Remplacez les fichiers images dans le bon dossier
2. Gardez les memes noms pour eviter toute modification supplementaire
3. Si vous changez les noms, mettez a jour `coverImage`, `heroImage` et `images` dans le JSON

## 4. Modifier les images des sections "Pages gerees", "Flyers" et "Videos & Motion Design"

Ces sections sont gerees depuis `content/portfolio-content.json`.

### Pages gerees

Section :

```json
"managedPagesSection": {
  "items": [
    {
      "image": {
        "src": "/images/projects/wearing-mind/cover.jpg"
      }
    }
  ]
}
```

Pour changer un visuel :

1. Placez l'image dans `public/images/...`
2. Mettez a jour `image.src` avec le nouveau chemin

### Flyers & Supports

Visuels actuels :

```text
public/images/showcase/flyers/
```

Exemples :

```text
public/images/showcase/flyers/flyer-1.jpg
public/images/showcase/flyers/flyer-2.jpg
public/images/showcase/flyers/flyer-3.jpg
```

Configuration dans `content/portfolio-content.json` :

```json
"flyersSection": {
  "items": [
    {
      "image": {
        "src": "/images/showcase/flyers/flyer-1.jpg"
      }
    }
  ]
}
```

### Videos & Motion Design

Visuels actuels :

```text
public/images/showcase/motion/
```

Exemples :

```text
public/images/showcase/motion/teaser-0212.mp4
public/images/showcase/motion/boost-performers.mp4
public/images/showcase/motion/spot-pub.mp4
```

Configuration dans `content/portfolio-content.json` :

```json
"motionSection": {
  "items": [
    {
      "video": {
        "kind": "mp4",
        "src": "/images/showcase/motion/teaser-0212.mp4"
      }
    }
  ]
}
```

## 5. Comment fonctionnent les videos aujourd'hui

La section `Videos & Motion Design` supporte maintenant de vraies videos integrees :

1. Fichiers `.mp4` locaux
2. Videos YouTube
3. Videos Vimeo

Le champ a utiliser dans `content/portfolio-content.json` est `video`.

Exemple MP4 :

```json
{
  "video": {
    "kind": "mp4",
    "src": "/images/showcase/motion/spot-pub.mp4"
  }
}
```

Exemple YouTube :

```json
{
  "video": {
    "kind": "youtube",
    "src": "https://www.youtube.com/watch?v=VIDEO_ID"
  }
}
```

Exemple Vimeo :

```json
{
  "video": {
    "kind": "vimeo",
    "src": "https://vimeo.com/VIDEO_ID"
  }
}
```

Pour mettre a jour vos realisations video :

1. Placez votre fichier MP4 dans `public/images/showcase/motion/` si c'est une video locale
2. Ou remplacez `src` par une URL YouTube ou Vimeo
3. Mettez a jour le texte de l'element dans `motionSection.items`
4. Vous pouvez conserver un `link` en plus si vous voulez ouvrir la video sur une page externe

## 6. Modifier les textes, liens et badges

Tout le contenu principal est centralise ici :

```text
content/portfolio-content.json
```

Vous pouvez y modifier :

1. Le nom et le titre du hero
2. La bio et les informations de contact
3. Les projets, leurs liens et leurs images
4. Les sections `managedPagesSection`, `flyersSection`, `motionSection`
5. Les badges, descriptions, roles et resultats

Vous pouvez le faire :

1. Directement dans le fichier JSON
2. Depuis `http://localhost:3000/admin`

## 7. Regles pratiques pour eviter les erreurs

1. Placez toujours les images dans `public/images/...`
2. Dans le JSON, utilisez des chemins web qui commencent par `/images/...`
3. Si vous remplacez un fichier sans changer son nom, aucune autre modification n'est necessaire
4. Si vous changez le nom ou l'emplacement d'un fichier, mettez a jour le chemin correspondant dans `content/portfolio-content.json`
5. Apres modification, rechargez la page ou relancez le serveur si necessaire

## 8. Formats recommandes

Formats image recommandes :

1. `.jpg`
2. `.png`
3. `.webp`

Bonnes pratiques :

1. Utiliser des images legeres pour garder un site rapide
2. Preferer des visuels larges pour les covers de projets
3. Utiliser des apercus nets et bien cadres pour la photo de profil

## 9. Formats videos supportes

La version actuelle prend deja en charge :

1. Les fichiers `.mp4` integres
2. YouTube
3. Vimeo

Extension possible plus tard :

1. Lightbox video plein ecran
2. Posters video generes automatiquement
3. Playlist ou carousel video
