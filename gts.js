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

// Arama fonksiyonu.
function search(
    word, // Aranacak Kelime girdisi.
    jsout=false, // Json çıktısı olarak verilsin mi?
    ) {
    for (let wji = 0; wji < sj.length; wji++) {
        // Object'i bri değişkene ata.
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
const sonucj = search(argv.at(-1));
if(!sonucj){
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write("Eşleşme bulunamadı.\n");
    process.exit(0);
}
// Satırı sil
process.stdout.clearLine(0);
process.stdout.cursorTo(0);
process.stdout.write("\n");

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