const reponse2 = await fetch("Artistes/ListeArtistes.json");
const Artiste = await reponse2.json();
const BoutonArtistes=document.createElement("button");
BoutonArtistes.addEventListener("click", function(){ListerArtistes(Artiste)});
BoutonArtistes.innerText="Artistes";
document.getElementById("container").appendChild(BoutonArtistes);

const BoutonVisite=document.createElement("button");
BoutonVisite.addEventListener("click", function(){Visite()});
BoutonVisite.innerText="Visite";
document.getElementById("container").appendChild(BoutonVisite);



function ListerArtistes(Artiste)
{
  // Efface l'écran avant d'afficher la liste
  const photoContainer = document.getElementById("photocontainer"); 
  photoContainer.innerHTML = ''; // Efface le contenu du conteneur

  console.log(Artiste);
  const artistesContainer = document.getElementById("listeartistes");
        Artiste.forEach(artiste => {
          const membreElement = document.createElement("artiste");
          membreElement.setAttribute('class','artiste');
          const membreArtiste = document.createElement("a");
          membreArtiste.onclick = () => openWindowArtiste(artiste);
          const nomArtiste = document.createElement("h4");
          nomArtiste.innerText = artiste.PrenomArtiste+" "+artiste.NomArtiste;
          membreArtiste.appendChild(nomArtiste);
          membreElement.appendChild(membreArtiste);
          artistesContainer.appendChild(membreElement);
        
        });
}
function GetArtisteByName(Name,Artiste){
  if (!Array.isArray(Artiste)) {
    throw new Error("Artistes doit être un tableau.");
  }

  // Trouver l'artiste dont le nom correspond
  const artiste = Artiste.find(artiste => artiste.NomArtiste === Name);
 console.log(artiste);
  // Retourner l'artiste trouvé, ou null s'il n'est pas trouvé
  return artiste;
}

 
function afficheArtiste(nomcompletartiste)
{console.log(nomcompletartiste);

};

function Visite() 
{
  // Efface l'écran avant d'afficher les photos
  const artistesContainer = document.getElementById("listeartistes"); 
  artistesContainer.innerHTML = ''; // Efface le contenu du conteneur

const apiKey = "b000733577cbe9e78d6a4112a411960c"; // Replace with your actual API key
const userId = "201112550@N08"; // Replace with the Flickr user ID (find this on their profile page)

const apiEndpoint = "https://api.flickr.com/services/rest/";

// Function to fetch photos
async function fetchPhotos(userId) {
  const perPage=200;
  const url =`${apiEndpoint}?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&extras=url_o,url_c,url_h&format=json&nojsoncallback=1&per_page=${perPage}`; // Inclure le paramètre extra=url_o

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
    if (data.photos.photo.length > 0) {
      // Sort photos by title before returning
      return data.photos.photo.sort((a, b) => a.title.localeCompare(b.title)).map((photo) => {
        return {
          id: photo.id,
          title: photo.title,
          nomcompletartiste:photo.title.split("_")[0],
          titre : photo.title.split("_")[1],
          url_c: photo.url_c,
          url_h: photo.url_h, 
          url_o: photo.url_o,
          owner: userId ,
         
        };
      });
    } else {
      console.error("No photos found for this user.");
      return []; // Return an empty array if no photos are found
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
    return []; // Return an empty array in case of an error
  }
}

// Example: Get photos for a specific user
fetchPhotos(userId)
  .then(photos => {
    // Now you have an array of photo objects (in JSON format)
    console.log(photos); // You can now use this data in your HTML

    // Example: Display photos in HTML
    // Récupération de l'élément du DOM qui accueillera les photos
  const photoContainer = document.getElementById("photocontainer");
  
    photos.forEach(photo => {
      const oeuvreElement = document.createElement("oeuvre");
      const photoElement = document.createElement("img");
      // Utilisez l'opérateur ternaire pour choisir l'URL
      photoElement.src = photo.url_c ? photo.url_c : photo.url_o;  // Affiche url_o si url_c est undefined
      photoElement.alt = photo.title;
      photoElement.onclick = () => openWindow(photo); // Correctly pass 'photo'
      photoElement.setAttribute('class','mediaImg');
      const nomelement = document.createElement("h4");
      nomelement.innerText = photo.title.split("_")[0];
      const titreelement = document.createElement("h5");
      titreelement.innerText = photo.title.split("_")[1];
      oeuvreElement.appendChild(nomelement);
      oeuvreElement.appendChild(titreelement);
      oeuvreElement.appendChild(photoElement);
      photoContainer.appendChild(oeuvreElement);
    });

  })
  .catch(error => {
    console.error(error);
  });
}
// Fonction pour récupérer l'URL de la photo
async function getPhotoUrl(apiKey,photoId) {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;
try {
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Trouvez la taille d'image originale (format 'o')
  const originalUrl = data.sizes.size.find(size => size.label === 'Original').source;

  // Affiche l'URL de la photo dans la console
  console.log('URL de la photo originale :', originalUrl);
  return originalUrl;
  // Vous pouvez utiliser l'URL pour afficher l'image dans une balise <img>
  // const imgElement = document.createElement('img');
  // imgElement.src = originalUrl;
  // document.body.appendChild(imgElement);
} catch (error) {
  console.error('Erreur lors de la récupération de l URL :', error);
}
}
async function openWindow(photo) {
  

  // Create the new window
  const newWindow = window.open("", "zoomphoto", "width=500,height=500");

    // Write the HTML content after the window is loaded
    newWindow.document.write('<link rel="stylesheet" href="zoomphoto.css">'); 
    newWindow.document.write(`
      <img src=${photo.url_o} alt="${photo.title}" class="zoom">
      <p> ${photo.nomcompletartiste}</p>
      <p> ${photo.titre}</p>
    `);
  };
  async function openWindowArtiste(artiste) {
  

    // Create the new window
    const newWindow = window.open("", "zoomphoto", "width=500,height=500");
  
      // Write the HTML content after the window is loaded
      newWindow.document.write('<link rel="stylesheet" href="zoomartiste.css">'); 
      newWindow.document.write(`
        <H4>${artiste.PrenomArtiste+" "+artiste.NomArtiste}</H4>
        <p>${artiste.Description.replace(/\n/g, '<br>')}</p> 
     
      `);
    };