/* const { Fore } = require("./colorama.js");
const package = require("./package.json");
function helpMenu() {
    console.log("\n"+Fore.BrightGreen+" ".repeat(package.description.length/2+1-package.name.length)+package.name+" "+package.version+Fore.Reset+"\n    "+Fore.Green+package.description+"\n"+Fore.Reset);
    console.log(Fore.BrightBlue+"    Kullanımı: "+Fore.BrightGreen+"./gts"+Fore.Reset+" <argümanlar> \"<aranacak kelime>\"\n\n"+Fore.Blue+"  Argümanlar:\n"+Fore.Reset);
    console.log(Fore.BrightGreen+"    -y, --yardim"+Fore.Reset+": Bu menüyü gösterir\n"+Fore.BrightGreen+"    -v, --versiyon"+Fore.Reset+": Proje versiyonunu gösterir.");
    console.log(Fore.BrightGreen+"    -j, --json"+Fore.Reset+": Json biçimindeki çıktıyı gösterir.");
    console.log(Fore.BrightGreen+"    -o"+Fore.Reset+": eğer varsa anlamların örneklerini gösterir.");
    console.log(Fore.BrightGreen+"    -a"+Fore.Reset+": eğer varsa kelime ile ilgili atasözlerini gösterir.");
    console.log(Fore.BrightGreen+"    -b"+Fore.Reset+": eğer varsa kelime ile birleşik olan kelimeleri gösterir.");
}
/* helpMenu(); */
/* console.log(
    Fore.Black+"Black",
    Fore.Blue+"Blue",
    Fore.Cyan+"Cyan",
    Fore.Gray+"Gray",
    Fore.Red+"Red",
    Fore.Yellow+"Yellow",
    Fore.White+"White",
    Fore.Green+"Green",
    Fore.Magenta+"Magenta",
    Fore.BrightBlue+"BrightBlue",
    Fore.BrightCyan+"BrightCyan",
    Fore.BrightGreen+"BrightGreen",
    Fore.BrightMagenta+"BrightMagenta",
    Fore.BrightRed+"BrightRed",
    Fore.BrightWhite+"BrightWhite",
    Fore.BrightYellow+"BrightYellow",
); */
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