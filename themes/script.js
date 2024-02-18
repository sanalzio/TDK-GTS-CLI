// * --------- variables --------- * //

// yüklenmeyi belirtmek için olan dönen yarım daire resmini bir değişkene ata.
const load_circle = document.getElementById("l");
// arama butonunun nesnesini bir değişkene ata.
const search_btn = document.getElementById("sb");
// kelimenin gösterildiği yeri bir değişkene ata.
const word = document.getElementById("word");
// Anlamlar ve örneklerinin olduğu div nesnesini bir değişkene ata.
const anlams_div = document.getElementById("anlams");
// Aranacak kelimenin girildiği girdi nesnesini bir değişkene ata.
const word_inp = document.getElementById("wi");
// "Kelime:" yazısını bir değişkene ata.
const word_header = document.getElementById("wordh");
// "Eşleşme bulunamadı" yazısını bir değişkene ata.
const no_found = document.getElementById("nofound");

// * --------- variables --------- * //



// * --------- functions --------- * //


// İki harf arasındaki uyuşmazlığını hesaplar.
function uyusmazlik(kelime1, kelime2) {
    /* Gerekli değişkenleri belirle:
    * out: kaç kelimenin uyuşmadığını taşıyan değişken.
    * kucukoglan: kısa olan kelime.
    * buyukoglan: uzun olan kelime.
    */
    let out = 0, kucukoglan, buyukoglan;
    // Eğer iki kelimeden biri diğerinden uzun ise:
    if(kelime1.length != kelime2.length) {
        // Kaç kelime uzunsa out değişkenini o kadar arttır.
        out+=kelime1.length-kelime2.length<0?kelime2.length-kelime1.length:kelime1.length-kelime2.length;
        // Kısa olan kelimeyi kucukoglan değişkenine ata.
        kucukoglan=kelime1.length-kelime2.length<0?kelime1:kelime2;
        // Uzun olan kelimeyi buyukoglan değişkenine ata.
        buyukoglan=kelime1.length-kelime2.length<0?kelime2:kelime1;
    }
    /* 
    Eğer iki kelimeden biri diğerinden kısa ise her fazlalık harf için
    out değişkenini bir arttırdın ama bu ileride sorun çıkartacak
    bu yüzden o fazlalıkları kırp.
    */
    for(let i = 0; buyukoglan && (i < (kelime1.length-kelime2.length<0?kelime1:kelime2).length) && (buyukoglan.length>kucukoglan.length); i++) {
        if(buyukoglan[i] != kucukoglan[i]) {
            let na = buyukoglan.split("");
            na.pop(i)
        }
    }
    // Eğer iki kelime arasında harf uyuşmazlığı var ise out değişkenini bir arttır.
    for(let i = 0; i < kelime1.length; i++) {
        if(kelime1[i] != kelime2[i]) {
            out++;
        }
    }
    // out değişkenini sonuç olarak döndür.
    return out;
}

// Arama fonksiyonu.
function search(
    word, // Aranacak Kelime girdisi.
    jsout=false, // Json çıktısı olarak verilsin mi?
    ) {
    // Eşleşme aramak için bir döngü kur:
    for (let wji = 0; wji < sj.length; wji++) {
        // Object'i bir değişkene ata.
        const wordj = sj[wji];
        // Object değişkenindeki madde değişkeni ile word eşleşiyor mu?
        if (wordj.madde.toLocaleLowerCase("tr")==word.toLocaleLowerCase("tr") || wordj.madde_duz.toLocaleLowerCase("tr")==word.toLocaleLowerCase("tr")) {
            // * Eğer eşleşiyor ise:

            // Eğer jsout true (doğru) ise -yani istenen çıktı biçimi Object ise- direkt wordj nesenesini döndür.
            if (jsout) { return wordj; }

            // Eğer değilse;
            let json = new Object(); // Eşleşen kelimenin bilgilerini daha sade biçimde taşıyan bir nesne oluştur.


            let anlams = new Array(); // Eşleşen kelimeye ait anlamların listesini oluştur.

            // Listedeki her bir nesnedeki anlam değişkenini anlams listesine ekle.
            for (let ai = 0; ai < wordj.anlamlarListe.length; ai++) {
                const anlamj = wordj.anlamlarListe[ai];
                // Eğer örnek yoksa sadece anlamı, eğer varsa anlam ile örnekleri json nesensine ekle
                anlams.push(anlamj.orneklerListe?[anlamj.anlam, anlamj.orneklerListe[0].ornek]:anlamj.anlam);
            }
            json.anlamlar=anlams; // Anlamlar listesini json nesnesine ekle.


            // Eğer atasözü var ise:
            if (wordj.atasozu) {
                let atas = new Array(); // Eşleşen kelimeye ait atasözlerin listesini oluştur.
                
                // Listedeki her bir nesnedeki atasozu değişkenini atas listesine ekle.
                for (let ai = 0; ai < wordj.atasozu.length; ai++) {
                    const ataj = wordj.atasozu[ai];
                    atas.push(ataj.madde);
                }
                json.atasozu=atas; // Atasözleri listesini json nesnesine ekle.
            }

            // Eğer birleşik olan kelime var ise:
            if (wordj.birlesikler) {
                json.birlesikler=wordj.birlesikler.split(", "); // Birleşik kelimelerin listesini json nesnesine ekle.
            }

            // Oluşturulan nesneyi döndürün
            return json;
        }
    }
    // Eğer hiçbir eşleşme bulunamazsa:
    for (let wji = 0; wji < sj.length; wji++) {
        // Object'i bir değişkene ata.
        const wordj = sj[wji];
        // Object değişkenindeki madde değişkeni ile word azıcık da osla eşleşiyor mu?
        if (uyusmazlik(wordj.madde.toLocaleLowerCase("tr"), word.toLocaleLowerCase("tr"))===1 || uyusmazlik(wordj.madde_duz.toLocaleLowerCase("tr"), word.toLocaleLowerCase("tr"))===1) {
            return [false, wordj.madde];
        }
    }
    return false;
}


// * --------- functions --------- * //



// * --------- main --------- * //


let sj;

fetch('../gts.json')
    .then(response => response.json())
    .then(dat => {
        sj = dat;
        load_circle.style.display = "none";
        search_btn.style.display = "inline-block";
    })

/* document.addEventListener("DOMContentLoaded", () => {
}); */

search_btn.addEventListener("click", () => {
    no_found.style.display = "none";
    load_circle.style.display = "inline-block";
    search_btn.style.display = "none";
    anlams_div.style.display = "inline-block";
    word_header.style.display = "block";
    
    let this_word=word_inp.value.toLocaleLowerCase("tr").trim();this_word=this_word[0].toLocaleUpperCase("tr")+this_word.slice(1);
    word.innerHTML=this_word;

    let sonucj = search(this_word);
    if(!sonucj || (sonucj.constructor === Array && sonucj[0]===false)){
        sonucj = search(sonucj[1]);
    } else {
        anlams_div.style.display = "none";
        word_header.style.display = "none";
        no_found.style.display = "inline-block";
    }

    load_circle.style.display = "none";
    search_btn.style.display = "inline-block";

    // * Sonuçları yaz:

    anlams_div.innerHTML="";

    // Her anlam için uygula:
    console.log(sonucj);
    for (let ai = 0; ai < sonucj.anlamlar.length; ai++) {
        const anlam = sonucj.anlamlar[ai];
        // Anlamı ve örneklerini konsola yazdır.
        if (typeof anlam == 'object') {
            anlams_div.innerHTML+=`<div class="anlam" id="anlam${ai+1}"><span class="anlamt">${ai+1}. ${anlam[0]}</span><span class="ornekt">Örnek: <span class="ornek">${anlam[1]}</span></span></div>`
        } else {
            anlams_div.innerHTML+=`<div class="anlam" id="anlam${ai+1}"><span class="anlamt">${ai+1}. ${anlam}</span></div>`
        }
    }
});