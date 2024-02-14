// * --------- requires --------- * // (Gerekli kütüphaneleri yükle.)


// Konsol'a renkli yazı yazma işlevini gören modülü -yani colorama.js dosyasını- yükle.
const { Fore } = require("./colorama.js");

// process.argv -Yani başlatma argümanları- için bir kısayol tarzı birşey oluştur.
const argv = process.argv;

// package.json dosyasını -yani proje hakkındaki bilgileri taşıyan verisetini- yükle.
const package = require("./package.json");


// * --------- requires --------- * //



// * --------- variables --------- * //


let ops = ""; // Başlatma seçeneklerinin bulunduğu dize. Örnek: "yjoab"
for (let opi = 0; opi < argv.length; opi++) {
    const opa = argv[opi];
    if (opa[0] == "-") { ops += opa.toLocaleLowerCase("tr").slice(1); }
}


// * --------- variables --------- * //




// * --------- functions --------- * //


// Yardım menüsü; --yardim yada --help kullanılırsa gösterilen menü.
function helpMenu() {
    console.log("\n"+Fore.BrightGreen+" ".repeat(package.description.length/2+1-package.name.length)+package.name+" "+package.version+Fore.Reset+"\n    "+Fore.Green+package.description+"\n"+Fore.Reset);
    console.log(Fore.BrightBlue+"    Kullanımı: "+Fore.BrightGreen+"./gts"+Fore.Reset+" <argümanlar> \"<aranacak kelime>\"\n\n"+Fore.Blue+"  Argümanlar:\n"+Fore.Reset);
    console.log(Fore.BrightGreen+"    -y, --yardim"+Fore.Reset+": Bu menüyü gösterir\n"+Fore.BrightGreen);
    console.log(Fore.BrightGreen+"    -j, --json"+Fore.Reset+": Json biçimindeki çıktıyı gösterir.");
    console.log(Fore.BrightGreen+"    -o"+Fore.Reset+": eğer varsa anlamların örneklerini gösterir.");
    console.log(Fore.BrightGreen+"    -a"+Fore.Reset+": eğer varsa kelime ile ilgili atasözlerini gösterir.");
    console.log(Fore.BrightGreen+"    -b"+Fore.Reset+": eğer varsa kelime ile birleşik olan kelimeleri gösterir.");
    console.log("");
}

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


// Eğer hiçbir argüman girilmedi ise helpMenu() fonksiyonunu çağır ve süreci sonlandır.
if (argv.length<3) { helpMenu(); process.exit(0); }
// Eğer --yardim yada --help kullanılırsa yardım menüsünü çağır.
else if (argv.includes("-y") || argv.includes("--yardim") || argv.includes("-h") || argv.includes("--help") || argv.includes("?")) { helpMenu(); process.exit(0); }

// gts.json verilerini yükle.
process.stdout.write("Sözlük verisi yükleniyor...");
const sj = require("./gts.json");

// "Sözlük verisi yükleniyor..." satırını sil.
process.stdout.clearLine(0);
process.stdout.cursorTo(0);
process.stdout.write("");

// Eğer direkt json olarak çıktı istenirse json çıktısını döndür.
if (argv.includes("-j") || argv.includes("--json") || ops.includes("j")) { console.log(JSON.stringify(search(argv.at(-1), true), null, 2)); process.exit(0); }

// * Ana kodlar

// Belirtilen kelimeyi ara.
process.stdout.write("Kelime aranıyor...");
let sonucj = search(argv.slice(2).join(" "));
if(!sonucj || (sonucj.constructor === Array && sonucj[0]===false)){
    // Eğer sonuç bulunamadıysa:
    // Eğer benzer bir kelime tespit edildiyse:
    if (sonucj.constructor === Array && sonucj[0]===false) {
        // Benzer kelimeyi kelime değişkenine ata.
        let kelime = sonucj[1];
        // Arama sonucunu benzer kelime ile değiştir.
        sonucj = search(kelime);
        // Satırı "Eşleşme bulunamadı. "<kelime>" sonuçları gösteriliyor." olarak değiştir.
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write("Eşleşme bulunamadı. \""+kelime+"\" sonuçları gösteriliyor.\n\n");
    } else { // Eğer tespit edilemediyse satırı "Eşleşme bulunamadı." olarak değiştir ve programı sonlandır.
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write("Eşleşme bulunamadı.\n");
        process.exit(0);
    }
} else {
    // Satırı sil.
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write("\n");
}

// * Sonuçları yaz:

// Her anlam için uygula:
for (let ai = 0; ai < sonucj.anlamlar.length; ai++) {
    const anlam = sonucj.anlamlar[ai];
    // Anlamı ve örneklerini konsola yazdır.
    console.log((ops.includes("o") && typeof anlam == 'object'?Fore.Cyan+"  Anlam "+(ai+1)+Fore.Reset+": \n    "+anlam[0]+Fore.Cyan+"\n  Örnek"+Fore.Reset+": \n    "+anlam[1]:(typeof anlam == 'string'?Fore.Cyan+"  Anlam "+(ai+1)+Fore.Reset+": \n    "+anlam:Fore.Cyan+"  Anlam "+(ai+1)+Fore.Reset+": \n    "+anlam[0]))+"\n");
}

// Eğer atasözü var ise her atasözü için uygula:
if (sonucj.atasozu && ops.includes("a")) {
    console.log(Fore.Cyan+"  Atasözleri"+Fore.Reset+":");
    for (let ai = 0; ai < sonucj.atasozu.length; ai++) {
        // Atasözünü konsola yazdır.
        console.log("    "+sonucj.atasozu[ai]);
    }
    console.log("");
}

// Eğer birleşik kelime var ise her birleşik kelime için uygula:
if (sonucj.birlesikler && ops.includes("b")) {
    console.log(Fore.Cyan+"  Birleşik kelimeler"+Fore.Reset+":");
    for (let ai = 0; ai < sonucj.birlesikler.length; ai++) {
        // Birleşik kelimeyi konsola yazdır.
        console.log("    "+sonucj.birlesikler[ai]);
    }
    console.log("");
}


// * --------- main --------- * //