import { useState } from "react";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/input";
import { cn } from "../../lib/utils";
import { Select } from "../components/ui/Select";
import { TextArea } from "../components/ui/TextArea";

const productIdeas = [
  {
    id: 1,
    label: "KPR Mandiri",
    description: `
📘 IDE KONTEN EDUKASI TENTANG KPR
Gunakan format carousel, reels, atau TikTok yang ringan dan engaging.

1. “KPR 101: Apa Itu KPR?”
Jelaskan istilah-istilah penting dalam KPR: DP, suku bunga, tenor, plafon, fixed & floating.
Format: Carousel atau video animasi sederhana.

2. “5 Mitos Tentang KPR yang Sering Disalahpahami”
Contoh: “Harus punya gaji besar dulu baru bisa ambil KPR?” (Fakta: banyak skema subsidi).
Format: Reels dengan storytelling.

3. “Simulasi Gaji & Cicilan KPR”
Buat tabel atau infografis: Gaji 5 juta bisa dapat rumah harga berapa?
CTA: “Komen gaji kamu, kita bantu hitung cicilannya!”

4. “Langkah-Langkah Ajukan KPR dari Nol”
Edukasi dalam 6 langkah: dari pilih rumah sampai akad kredit.
Format: Carousel atau IG Guide.

5. “Tips Lolos BI Checking untuk Ajukan KPR”
Sasar milenial dan first jobber.
Format: TikTok dengan skenario “gagal lolos KPR”.

6. “KPR Subsidi vs KPR Non-Subsidi: Mana yang Cocok Buatmu?”
Buat quiz interaktif di IG Story atau konten bandingkan 2 skema.

7. “10 Istilah KPR yang Harus Kamu Tahu”
DP, SHM, IMB, appraisal, dll.
Bisa dikemas ala kamus singkat di Reels.

💡 CARA UNIK DAN MENARIK UNTUK JUALAN KPR
1. KPR Personal Assistant (via WhatsApp Bot)
Sediakan layanan tanya jawab otomatis (atau semi-otomatis) di WhatsApp: “Mau tahu rumah yang cocok dengan gaji kamu? Chat kami!”

2. Virtual Open House + KPR Simulation
Tawarkan tur virtual rumah + simulasi cicilan langsung di akhir video (bisa pakai Google Forms atau landing page interaktif).
Gunakan drone footage untuk impresi wow.

3. “KPR Challenge” di TikTok
Tantang orang hitung cicilan rumah impian mereka → yang realistis, dibantu kamu kasih opsi real listing.

4. Bikin “KPR Matching” Seperti Dating App
Rumah yang cocok dengan kondisi keuangan user = “match”.
Buat konten lucu: “Kalau kamu adalah rumah, kamu tuh tipe yang...”

5. Ngobrol Bareng Pengguna KPR (Testimoni Storytelling)
Undang pembeli rumah bercerita: “Gaji UMR, tapi bisa punya rumah karena...”
Format vlog mini / podcast ringan.

6. “Ngobrol Rumah Bareng Tetangga” – IG Live/Mini Series
Kupas tuntas kompleks perumahan tertentu + tanya-tanya tetangga real.
Bangun trust dan realitas tinggal di situ.

7. Program “Beli Rumah, Dapat Coaching Keuangan”
Tambahkan bonus value: beli rumah lewat kamu, dapat sesi 1-on-1 budgeting bareng coach.

🎯 Targeting Tips:
Fokus ke segmen first-time home buyers (usia 25–35 tahun).
Gunakan bahasa ringan & visual clean.
Gunakan humor atau meme relevan: “Pilih jajan kopi tiap hari vs cicil rumah…”
    `,
  },
  {
    id: 2,
    label: "Kartu Kredit Mandiri",
    description: `
📘 IDE KONTEN EDUKASI TENTANG KARTU KREDIT
1. “Kartu Kredit Bukan Musuhmu!”
Edukasi tentang manfaat kartu kredit bila digunakan dengan bijak.
Format: Reels lucu “kata orang vs fakta kartu kredit”.

2. “Istilah Kartu Kredit yang Wajib Kamu Tahu”
Misalnya: limit, billing cycle, grace period, minimum payment, annual fee.
Bisa dalam bentuk carousel ala kamus mini.

3. “Cara Gunakan Kartu Kredit Tanpa Terjerat Utang”
Tips seperti: bayar full, atur limit sesuai penghasilan, pantau transaksi via app.
Format: carousel edukatif atau TikTok skenario.

4. “Gaji UMR Bisa Punya Kartu Kredit? Bisa Banget!”
Edukasi tentang kartu kredit entry-level atau secured card.
Format: Simulasi approval + tips jitu lolos.

5. “Kenapa Harus Punya Kartu Kredit?”
Fokus pada value: point reward, promo cicilan, build credit score.
Format: konten bandingkan cash vs kartu kredit.

6. “Cicilan 0% Bukan Promo Bohong”
Jelaskan cara kerja promo cicilan, toko partner, dan syarat-syaratnya.
Bisa dikemas seperti FAQ singkat.

7. “Kartu Kredit VS Paylater, Mana Lebih Baik?”
Bandingkan bunga, fleksibilitas, dan dampak jangka panjang.
Gunakan grafik atau ilustrasi ringan.

💡 CARA UNIK JUALAN KARTU KREDIT
1. “Tes Kepribadian: Kamu Cocok Pakai Kartu Kredit Jenis Apa?”
Bikin kuis interaktif di IG Story atau web quiz:
Suka traveling → cocok kartu dengan mileage reward
Suka ngopi dan belanja online → cashback lifestyle card

2. “Kartu Kredit Challenge”
Tantang followers untuk belanja hemat pakai kartu kredit selama seminggu → share pengalamannya.
Bisa kasih hadiah atau bonus referral.

3. “Promo of The Month” dengan Gaya Lucu
Contoh: “Ngopi di Starbucks cuma Rp10 ribu? Ini bukan mimpi, ini kartu kredit kamu yang kerja.”
Bikin konten meme-friendly.

4. Simulasi Approval Storytelling
Cerita: “Gaji 4 juta, takut ditolak? Begini caraku akhirnya disetujui...”
Ending: ajakan DM untuk konsultasi kartu kredit terbaik.

5. “Unboxing Kartu Kredit”
Format seperti unboxing gadget: dari buka amplop, sampai daftar promo dan benefit.
Tambahkan reaksi lucu atau dramatis.

6. “Road to Punya Kartu Kredit Pertama” Mini Series
Buat konten berseri:
Ep 1: Kenapa pengin punya kartu kredit
Ep 2: Proses pengajuan
Ep 3: Penggunaan pertama kali
Ep 4: Tips aman pakai

7. Reward Reminder Routine
Buat konten reguler “Reminder Promo Bulan Ini” ala story highlights.
Sediakan poster mini dengan promo per kategori: travel, food, e-commerce.

🎯 Targeting Tips:
Fokus ke gaya hidup: diskon ngopi, cashback e-wallet, cicilan gadget.
Gunakan bahasa ringan: “Lo ngerasa dewasa banget gak sih waktu pertama punya kartu kredit?”
Tampilkan gaya hidup aspiratif tapi tetap realistis.
    `,
  },
  {
    id: 3,
    label: "Tabungan Now",
    description: `
📘 IDE KONTEN EDUKASI: TRM dengan Studi Kasus
📍Judul Konten: “Uang 2 Juta dari Orang Tua, Pilih Menabung atau Menguap?”
Format: Carousel / Reels storytelling

Slide 1 – Problem:
“Bayangin kamu dikasih 2 juta sebulan dari orang tua.”

Slide 2 – Skenario:
Orang A: menabung 200 ribu ke TRM tiap bulan.
Orang B: tidak menabung, habis untuk jajan dan hal impulsif.

Slide 3 – 3 Bulan Berlalu:
Orang A: punya tabungan 600rb, siap untuk beli tiket liburan atau emergency.
Orang B: uang habis tanpa jejak.

Slide 4 – Punchline:
“Uang sama. Waktu sama. Yang beda: pilih disiplin atau penyesalan.”

Slide 5 – CTA:
“Mulai TRM Mandiri dari Rp100.000/bulan. Uangmu ngilang tetap ke arah yang jelas.”

🎥 IDE VIDEO/REELS: "Ngobrol Sama Uangmu Sendiri"
Konsep: Akting dua versi kamu duduk bareng (split-screen), satunya versi kamu yang menabung, satunya versi kamu yang boros.
Dialog:
“Loh, kamu masih punya tabungan?”
“Iya lah, tiap bulan aku setor ke TRM. Minimal banget, tapi hasilnya tenang.”
“Aku juga punya… tagihan Shopee PayLater.” 😅
Ending:
Logo TRM muncul + teks: “Mau jadi versi yang mana?”

💡 CARA UNIK JUALAN TRM (Tabungan Rencana Mandiri)
1. “TRM Goals Mapping” (Konten Interaktif)
Ajak audiens pilih goals mereka:
🛫 Liburan
🎓 Dana kuliah
🎁 Hadiah buat orang tua
💼 Modal bisnis
→ Lalu arahkan ke: “Kamu butuh berapa / bulan untuk mencapainya? TRM bantu kamu konsisten.”

2. Kampanye “#HabisTapiBerguna”
Edukasi bahwa uang habis itu biasa, tapi arahkan ke yang bermanfaat.
Tampilkan testimoni pengguna TRM yang akhirnya bisa:
Bayar DP motor
Traveling
Dana darurat untuk kuliah

3. Simulasi TRM dengan Gaji atau Uang Bulanan
Konten kalkulasi ringan:
“Gaji kamu 3 juta? Sisihkan 300 ribu ke TRM = Rp3,600,000 setahun!”
Tambahkan CTA: “Klik link ini untuk mulai simulasinya.”

4. TRM ala Meme:
Format meme:
“Uang: Kalau gak ditabung, aku bakal… lenyap 😈”
Bikin relatable dan shareable.

5. Sticker Goals untuk Story/Highlight
Bikin sticker template “TRM aku untuk...”
Bisa diisi user sendiri di Story mereka.

✨ Copywriting CTA Pendek
“Uangnya bakal habis juga. Kenapa nggak dialihin ke tabungan masa depan?”
“TRM Mandiri: Menabung kecil, hasil besar.”
“Punya tujuan? TRM bantu kamu sampai ke sana.”
“Kamu ngatur uang, bukan sebaliknya.”
    `,
  },
];

export function BankDock({ onClick }) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [idea, setIdea] = useState("");

  const handleProductChange = (e) => {
    const value = e.target.value;
    setSelectedProduct(value);
    const found = productIdeas.find((item) => String(item.id) === value);
    setIdea(found ? found.description : "");
  };

  return (
    <div className="shadow-input mx-auto w-full min-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <form>
        <h1 className="text-center text-xl mb-5">
          Brainstorming Ide Jualan Harian
        </h1>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="product">Produk Mandiri</Label>
          <Select
            id="product"
            name="product"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            {productIdeas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </Select>
        </LabelInputContainer>

        {idea && (
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-md p-4 mt-4 whitespace-pre-line text-sm overflow-y-auto max-h-96">
            {idea}
          </div>
        )}

        <div className="flex flex-col space-y-4 my-5">
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="button"
            onClick={onClick}
          >
            &larr; Back
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
