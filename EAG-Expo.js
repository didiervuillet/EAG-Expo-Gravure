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
  console.log(Artiste);
  const artistesContainer = document.querySelector("ListeArtistes");
        Artiste.forEach(artiste => {
          const nomArtiste = document.createElement("h4");
          nomArtiste.innerText = artiste.PrenomArtiste+" "+artiste.NomArtiste;
          artistesContainer.appendChild(nomArtiste);
        
        });
}

function Visite() 
{
const apiKey = "b000733577cbe9e78d6a4112a411960c"; // Replace with your actual API key
const userId = "201112550@N08"; // Replace with the Flickr user ID (find this on their profile page)

const apiEndpoint = "https://api.flickr.com/services/rest/";

// Function to fetch photos
async function fetchPhotos(userId) {
  const url = `${apiEndpoint}?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`; 

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.photos.photo.length > 0) {
      return data.photos.photo.map((photo) => {
        return {
          id: photo.id,
          title: photo.title,
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`, 
          owner: userId 
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
  const photoContainer = document.querySelector("photocontainer");
  
    photos.forEach(photo => {
      const photoElement = document.createElement("img");
      photoElement.src = photo.url;
      photoElement.alt = photo.title;
      photoContainer.appendChild(photoElement);
    });

  })
  .catch(error => {
    console.error(error);
  });
}