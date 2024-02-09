const { Fore } = require("./colorama.js");
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
function format(json) {
    return json
    .replaceAll("},","},\n")
    .replaceAll("{","{\n  ")
    .replaceAll("[","[\n    ")
    .replaceAll("],","],\n")
    .replaceAll("\",\"","\",\n  \"")
    .replaceAll(",\"",",\n\"")
    .replaceAll("\"}","\"\n}")
    .replaceAll("}","}\n")
    .replaceAll("]","]\n")
    ;
}
/* helpMenu(); */
console.log(
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
);
// console.log(format('{"_id":66947,"madde_id":"66947","kac":"0","kelime_no":"54439","cesit":"0","anlam_gor":"0","on_taki":null,"madde":"vay","cesit_say":"2","anlam_say":"3","taki":null,"cogul_mu":"0","ozel_mi":"0","lisan_kodu":"0","lisan":"","telaffuz":null,"birlesikler":null,"font":null,"madde_duz":"vay","gosterim_tarihi":null,"anlamlarListe":[{"anlam_id":"90461","madde_id":"66947","anlam_sira":"1","fiil":"0","tipkes":"0","anlam":"Şaşma anlatan bir söz","gos":"0","orneklerListe":[{"ornek_id":"29534","anlam_id":"90461","ornek_sira":"1","ornek":"Vay gülüm! Nereden bu geliş?","kac":"1","yazar_id":"10","yazar":[{"yazar_id":"10","tam_adi":"Memduh Şevket Esendal","kisa_adi":"M. Ş. Esendal","ekno":"135"}]}],"ozelliklerListe":[{"ozellik_id":"18","tur":"3","tam_adi":"ünlem","kisa_adi":"ünl.","ekno":"29"}]},{"anlam_id":"90462","madde_id":"66947","anlam_sira":"2","fiil":"0","tipkes":"0","anlam":"Ağrı, acı vb. duyguları anlatan bir söz","gos":"0","orneklerListe":[{"ornek_id":"29535","anlam_id":"90462","ornek_sira":"1","ornek":"Vay başım!","kac":"1","yazar_id":"0"}]},{"anlam_id":"90463","madde_id":"66947","anlam_sira":"3","fiil":"0","tipkes":"0","anlam":"Yönelme durumu eki almış bir kelime ile kullanıldığında bir şeyin veya bir kimsenin kötü bir sonuca uğrayacağını anlatan bir söz","gos":"0","orneklerListe":[{"ornek_id":"29536","anlam_id":"90463","ornek_sira":"1","ornek":"Vay hâline!","kac":"1","yazar_id":"0"}]}],"atasozu":[{"madde_id":"66948","madde":"vay anam! (veya anasını! veya canına!)"},{"madde_id":"66949","madde":"vay sen misin?"}]}'))