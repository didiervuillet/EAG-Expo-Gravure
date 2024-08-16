// Programme pour afficher les oeuvres d'une exposition décrite dans une base Json

const reponse2 = await fetch("rf.json");
const membres = await reponse2.json();

// afficher les anniversaires des 7 prochains jours
// Déterminer les dates limites à selectionner ( Mois-jour)

var anniversairesMin = Number;
var anniversairesMax = Number;
let dateObj = new Date();
let month = String;
let day = String;

  month = String(dateObj.getMonth() + 1).padStart(2, '0');
  day = String(dateObj.getDate()).padStart(2, '0');
  anniversairesMin=month+day;
  dateObj.setDate(dateObj.getDate() + 10);
  month = String(dateObj.getMonth() + 1).padStart(2, '0');
  day = String(dateObj.getDate()).padStart(2, '0');
  anniversairesMax=month+day;

// selectionner les personnes et les ranges dans un tableau 
let anniversaires = [];

let naissancemmjj = Number;

let j=0;
for (let i=0; i< membres.length; i++){
 
naissancemmjj=membres[i].DateNaissance.substr(3,2)+membres[i].DateNaissance.substr(0,2);
if(membres[i].DateDeces=="")
  {
    if(naissancemmjj>=anniversairesMin && naissancemmjj<=anniversairesMax) 
    {
      anniversaires[j]=naissancemmjj+" "+membres[i].Id;
      j++;
    }
  } 
}
// trier les membres selectionnés avec anniversaires
  
anniversaires.sort();



// Afficher les anniversaires des prochains jours


for (let i=0;i<anniversaires.length;i++){
AfficherAnniversaire(anniversaires[i].substring(5));
}

 //trier la liste membres

 membres.sort(function compare (a,b){
     
    if (a.PrenomMembre < b.PrenomMembre) 
      {
         return -1;
     }
     else if( a.PrenomMembre > b.PrenomMembre)
      {
         return +1;
     }
     else {return 0};
     })

const List=document.querySelector(".List");   
// créer les boutons parents enfants  ok

const UpParents=document.createElement("button");
// UpParents.addEventListener("click", function (){TreeEnfants(Enfants[i].Id);});
UpParents.addEventListener("click", function(){TreeParents(document.getElementById("membre").value)});
UpParents.innerText="Parents";
const DownEnfants=document.createElement("button");
DownEnfants.addEventListener("click", function (){TreeEnfants(document.getElementById("membre").value)});
DownEnfants.innerText="Conjoint-Enfants";

// Saisie du choix du membre avec une liste déroulante

     var select = document.createElement("select");
     select.name = "membre";
    select.id = "membre"
    for(let i=0;i< membres.length;i++)
    {
        var option = document.createElement("option");
         option.value = membres[i].Id;
         option.text = membres[i].PrenomMembre+" "+membres[i].NomMembre;
         select.appendChild(option);
    }

    var label = document.createElement("label");
    label.innerHTML = "Choisir un membre de la famille "
    label.htmlFor = "membre";
 
    document.getElementById("container").appendChild(label).appendChild(select);
    document.getElementById("container").appendChild(UpParents);
    document.getElementById("container").appendChild(DownEnfants);
   
//création des éléments html



//définir TreeEnfants!!!

function TreeEnfants(id){
  const Tree=document.querySelector(".Tree");
    Tree.innerHTML="";

    let MembreCourant= GetByID(id)[0];
  
    let pere= new Array();
    
     let mere= new Array();
    if(MembreCourant.Sexe=="M"){
        pere[0]=  MembreCourant;
   
       if(MembreCourant.NomEpoux==""){
              mere= GetConjoint(MembreCourant.NomMembre,MembreCourant.PrenomMembre);}
        else{   mere= GetByName(MembreCourant.NomEpoux, MembreCourant.PrenomEpoux)}
       }
    else{
        mere[0]=MembreCourant;
    
        if(MembreCourant.NomEpoux==""){
              pere= GetConjoint(MembreCourant.NomMembre,MembreCourant.PrenomMembre);}
            else{  pere= GetByName(MembreCourant.NomEpoux, MembreCourant.PrenomEpoux)}
    }

    if (pere.length=1)
    {
      for(let j=0;j<mere.length;j++)
      {
        AfficherInitFamille;
        AfficherMembre(pere[0].Id,"P");
        AfficherMembre(mere[j].Id,"M");
    

        const Enfants= GetEnfant(pere[0].NomMembre,pere[0].PrenomMembre,mere[j].NomMembre,mere[j].PrenomMembre);
    

        for(let i=0;i<Enfants.length;i++)
        {
          AfficherMembre(Enfants[i].Id,"E")
        }
      }
    }
      else
      {
        for(let j=0;j<pere.length;j++)
        {
          AfficherInitFamille;
          AfficherMembre(pere[j].Id,"P");
          AfficherMembre(mere[0].Id,"M");

          const Enfants= GetEnfant(pere[j].NomMembre,pere[j].PrenomMembre,mere[0].NomMembre,mere[0].PrenomMembre);
    

          for(let i=0;i<Enfants.length;i++)
          {
          AfficherMembre(Enfants[i].Id,"E")
         }


         }

      }

    }
   
 function AfficherInitFamille(){
    
  // Récupération de l'élément du DOM qui accueillera la famille
  const sectionFamille = document.querySelector(".Tree");
  // Création d’une balise dédiée à un membre
  const initelement = document.createElement("initfamille");
  // Création des balises 
  const initfamille= document.createElement("br");
  // On rattache la balise membre a la section Famille
  sectionFamille.appendChild(initelement);
  // On rattache les données à membreElement (la balise membre)
  initelement.appendChild(initfamille);
}


    function AfficherMembre(id,type){
    
        
          const membre = GetByID(id);
          // Récupération de l'élément du DOM qui accueillera la famille
          const sectionFamille = document.querySelector(".Tree");
          // Création d’une balise dédiée à un membre
          const membreElement = document.createElement("membre");
          // Création des balises 
          const imageElement = document.createElement("img");
          imageElement.src ="photos/"+NoAccent(membre[0].PrenomMembre)+NoAccent(membre[0].NomMembre)+".jpeg"
          imageElement.alt="pas de photo";
          const containerElement = document.createElement("div");
          containerElement.className="containerElement";
          const prenomnomElement = document.createElement("h4");
          prenomnomElement.innerText = membre[0].PrenomMembre+" "+membre[0].NomMembre;
          const ddnElement = document.createElement("h4");
          ddnElement.innerText = membre[0].DateNaissance;
          const ldnElement = document.createElement("h4");
          if(membre[0].Sexe=="M")
            {
            ldnElement.innerText = "Né à "+membre[0].LieuNaissance;
            }
            else 
            {
              ldnElement.innerText = "Née à "+membre[0].LieuNaissance;
            }

          const ageElement = document.createElement("h4");
          if(membre[0].DateDeces==""){
            if(membre[0].DateNaissance=="")
            {
              ageElement.innerText = "";
            }
            else 
            {
              ageElement.innerText = CalculAgeBebeAussi(membre[0].DateNaissance);
            }
          }
          // créer les boutons parents lorsque le parent est présent dans le json

          const bouton=document.createElement("button");
          if(type=="P" || type=="M")
            {
              if(membre[0].NomPere!=""){
               bouton.addEventListener("click", function(){TreeParents(id)});
               bouton.innerText="Parents";
              }
            }
            // créer les boutons enfants lorsque il y a des conjoints
            else
            {
             if(membre[0].NbEpoux!=0) 
              {
               bouton.addEventListener("click", function(){TreeEnfants(id)});
               bouton.innerText="Conjoint-Enfants";
              }
              
               
             }
          // On rattache la balise membre a la section Famille
          sectionFamille.appendChild(membreElement);
        
          // On rattache les données à membreElement (la balise membre)
          membreElement.appendChild(imageElement);
          membreElement.appendChild(containerElement);
          containerElement.appendChild(prenomnomElement);
          containerElement.appendChild(ddnElement);
          containerElement.appendChild(ldnElement);
          containerElement.appendChild(ageElement);
          containerElement.appendChild(bouton);    
       }
  
       function AfficherAnniversaire(id){
        const today = new Date();
        var indicemois=Number;
        const membre = GetByID(id);
        // Récupération de l'élément du DOM qui accueillera la famille
        const sectionFamille = document.querySelector(".anniv");
        // Création d’une balise dédiée à un membre
        const membreElement = document.createElement("membreanniv");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src ="photos/"+NoAccent(membre[0].PrenomMembre)+NoAccent(membre[0].NomMembre)+".jpeg"
        imageElement.alt="pas de photo";
        const containerElement = document.createElement("div");
        containerElement.className="containerElement";
        const prenomnomElement = document.createElement("h4");
        prenomnomElement.innerText = membre[0].PrenomMembre+" "+membre[0].NomMembre;
        const ddnElement = document.createElement("h4");
        const listemois=["Jan","Fev","Mar","Avr","Mai","Juin","Jui","Août","Sep","Oct","Nov","Dec"];
        indicemois=membre[0].DateNaissance.substr(3,2)-1;
        ddnElement.innerText = membre[0].DateNaissance.substr(0,2)+" "+listemois[indicemois];
        const ageElement = document.createElement("h4");
        if(membre[0].DateDeces==""){
          if(membre[0].DateNaissance=="")
          {
            ageElement.innerText = "";
          }
          else 
          {
            if(membre[0].DateNaissance.substr(0,2)==today.getDate()){
              ageElement.innerText = (CalculAge(membre[0].DateNaissance))+" ans";
            }
            else {
            ageElement.innerText = (CalculAge(membre[0].DateNaissance)+1)+" ans";
            }
          }
        }
        // On rattache la balise membre a la section Famille
        sectionFamille.appendChild(membreElement);
      
        // On rattache les données à membreElement (la balise membre)
        membreElement.appendChild(imageElement);
        membreElement.appendChild(containerElement);
        containerElement.appendChild(prenomnomElement);
        containerElement.appendChild(ddnElement);
        containerElement.appendChild(ageElement);
           
     }
function TreeParents(id){ 

  const Tree=document.querySelector(".Tree");
  Tree.innerHTML="";

     let MembreCourant= GetByID(id)[0];
    if(MembreCourant.NomPere==""){alert("Le nom du père de "+MembreCourant.PrenomMembre+" n'est pas dans le fichier"); return false;}
    if(MembreCourant.NomMere==""){alert("Le nom de la mère de "+MembreCourant.PrenomMembre+" n'est pas dans le fichier"); return false;}
    const pere=  GetByName(MembreCourant.NomPere,MembreCourant.PrenomPere)
    const mere= GetByName(MembreCourant.NomMere,MembreCourant.PrenomMere)
    AfficherMembre(pere[0].Id,"P");
    AfficherMembre(mere[0].Id,"M");
   const Enfants= GetEnfant(pere[0].NomMembre,pere[0].PrenomMembre,mere[0].NomMembre,mere[0].PrenomMembre);
    for(let i=0;i<Enfants.length;i++){
      AfficherMembre(Enfants[i].Id,"E")
     }
};

function GetByName(nom, prenom){
    const list2= membres.filter(e=>e.NomMembre==nom && e.PrenomMembre==prenom);


    return list2
}


function GetEnfant(nomPere, prenomPere, nomMere, prenomMere) {
   
    const list2= membres.filter(e=>e.NomPere==nomPere && e.PrenomPere==prenomPere && e.NomMere==nomMere && e.PrenomMere==prenomMere);
  
    list2.sort( function ( a,b) { 
       
       const retour=a.DateNaissance.slice(6) - b.DateNaissance.slice(6);
       if(retour==0){
        retour=a.DateNaissance.slice(3,5) - b.DateNaissance.slice(3,5)
       }
       return retour;
     
       })
     return list2;
     b=2;
}

function GetConjoint (nom, prenom){

   
    const list2= membres.filter(e=>e.NomEpoux==nom && e.PrenomEpoux==prenom);
    return list2;
}

function GetByID(id){
    const list2= membres.filter(e=>e.Id==id);
    return list2;
                    }
 function CalculAge(DateNaissance){
  // calcule l'age en années
    var ladate=new Date();
    var datedujour= new String;
    datedujour=ladate.toLocaleDateString();
   
    var moisjourtoday= new Number;
      moisjourtoday=parseInt(datedujour.substring(3,5)+datedujour.substring(0,2))
      var moisjournaissance=new Number;
      moisjournaissance= parseInt(DateNaissance.substr(3,2)+DateNaissance.substr(0,2));
     var Age= ladate.getFullYear()-DateNaissance.substr(6,4);
     if(moisjourtoday<moisjournaissance){
     Age--;}
     return Age;
                     }
    function CalculAgemois(DateNaissance){
    // calcule l'age en mois pour des bebes de moins d'un an
    var ladate=new Date();
    var datedujour= new String;
    datedujour=ladate.toLocaleDateString();
  
    var moistoday= new Number;
    var jourtoday= new Number;
    moistoday=parseInt(datedujour.substring(3,5));
    jourtoday=parseInt(datedujour.substring(0,2));
  
    // on isole le jour et le mois de naissance

      var moisnaissance=new Number;
      var journaissance=new Number;
      moisnaissance= parseInt(DateNaissance.substr(3,2));
      journaissance= parseInt(DateNaissance.substr(0,2));

      // si le mois de naissance est supérieur au mois du jour, on ajout 12 au mois du jour
      if(moisnaissance>moistoday)
        {moistoday=moistoday+12;
        }
      // on calcule le nb de mois de différence
      var AgeMois= moistoday-moisnaissance;
      // if faut diminuer de 1 mois si le jour d'aujourd'hui est inférieur au jour de naissance
      if(moistoday<journaissance){
      AgeMois--;}
      return AgeMois;
    }

      function CalculAgeBebeAussi(DateNaissance)
      // calcule l'age  et si moins d'un an appelle CalculAgemois pour obtenir l'age en mois
      {
      
        var ladate=new Date();
        var datedujour= new String;
        var age = Number;
        datedujour=ladate.toLocaleDateString();
        age = CalculAge(DateNaissance);
       
        if(age==0){
          return CalculAgemois(DateNaissance)+" mois";

        }
        else
        {
          return age+" ans";
        }
      }

function NoAccent(a) {
  var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
      c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
      d="";
  for(var i = 0, j = a.length; i < j; i++) {
    var e = a.substr(i, 1);
    d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
  }
  return d;
};