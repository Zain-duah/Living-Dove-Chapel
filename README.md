# Living Dove Chapel

The Living Dove Chapel website is a React site for the church community in Community 2, Tema, Ghana.

## Local development

```sh
npm install
npm start
```

## Production build

```sh
npm run build
```

The production-ready site is generated in `build/`. Vercel can build this Create React App project with `npm run build` and serve the `build` directory.

## Leader profile photos

Add a `.jpg`, `.jpeg`, `.png`, or `.webp` photo to `src/images`, then set that leader's `image` value in `src/App.js` to the exact filename, for example `image: 'job1.jpg'`. To change a photo later, replace the filename with the new photo's filename. No imports or filename matching are needed.

## Search and sharing

The page title, description, canonical URL, social sharing metadata, and church structured data are in `public/index.html`. The sitemap and crawler rules are in `public/sitemap.xml` and `public/robots.txt`.
