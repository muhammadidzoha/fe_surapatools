"use client";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/input";
import { cn } from "../../lib/utils";
import { Select } from "../components/ui/Select";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

export function BankSuit({ onClick, setIsOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getRecommendedProducts = (formValues) => {
    const { age, job, salary } = formValues;

    // Case 1: Usia 26-35 atau 36-45, Gaji 10-20 Juta, Pekerjaan Wirausaha
    if (
      (age === "Dewasa_Muda" || age === "Dewasa") &&
      salary === "SEPULUH_JUTA_SAMPAI_DUA_PULUH_JUTA" &&
      job === "Wirausaha"
    ) {
      return [
        {
          name: "KUR",
          title: "Kredit Usaha Rakyat",
          description:
            "Modal usaha dengan bunga ringan untuk mengembangkan bisnis Anda",
        },
        {
          name: "Kartu Kredit",
          title: "Kartu Kredit",
          description:
            "Kemudahan bertransaksi dengan berbagai keuntungan dan promo menarik",
        },
        {
          name: "Livin Merchant & EDC",
          title: "Livin Merchant & EDC",
          description:
            "Solusi pembayaran digital untuk meningkatkan omzet usaha Anda",
        },
      ];
    }

    // Case 2: Usia 25-35 atau 36-45, Job Karyawan Swasta atau ASN
    if (
      (age === "Dewasa_Muda" || age === "Dewasa") &&
      (job === "Karyawan_Swasta" || job === "Aparatur_Sipil_Negara")
    ) {
      // Salary 3-5 Juta
      if (salary === "DUA_JUTA_SAMPAI_LIMA_JUTA") {
        return [
          {
            name: "FLPP",
            title: "Fasilitas Likuiditas Pembiayaan Perumahan",
            description:
              "Program subsidi pemerintah untuk kepemilikan rumah pertama dengan bunga rendah",
          },
        ];
      }

      // Salary 5-10 atau 10-20 Juta
      if (
        salary === "LIMA_JUTA_SAMPAI_SEPULUH_JUTA" ||
        salary === "SEPULUH_JUTA_SAMPAI_DUA_PULUH_JUTA"
      ) {
        return [
          {
            name: "Kartu Kredit",
            title: "Kartu Kredit",
            description:
              "Kemudahan bertransaksi dengan berbagai keuntungan dan promo menarik",
          },
          {
            name: "KPR",
            title: "Kredit Pemilikan Rumah",
            description:
              "Wujudkan impian memiliki rumah dengan cicilan terjangkau",
          },
          {
            name: "KSM",
            title: "Kredit Serbaguna Mandiri",
            description:
              "Pinjaman tanpa agunan untuk berbagai kebutuhan pribadi",
          },
        ];
      }
    }

    return [];
  };

  const onSubmit = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const formattedQuestioners = [
      {
        question: "Apakah Anda rutin menabung setiap bulan?",
        answer: values.menabung || null,
      },
      {
        question: "Apakah Anda memiliki dana darurat?",
        answer: values.danaDarurat || null,
      },
      {
        question: "Anda lebih nyaman dengan produk syariah atau konvensional?",
        answer: values.produkBanking || null,
      },
      {
        question:
          "Apakah Anda bersedia mengambil risiko demi potensi keuntungan yang lebih tinggi?",
        answer: values.risikoInvestasi || null,
      },
    ].filter((q) => q.answer !== null);

    const payload = {
      name: values.name,
      age: values.age,
      job: values.job,
      salary: values.salary,
      goal: values.goal,
      questioners: formattedQuestioners,
    };

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        axios.post("http://localhost:1234/api/customers/create", payload)
      ),
      {
        pending: "Creating Data...",
        success: {
          render(response) {
            // Show modal with recommended products after successful submission
            const products = getRecommendedProducts(values);
            setRecommendedProducts(products);
            setShowModal(true);
            return response.data.data.message;
          },
          onClose: () => {
            // Don't close the main modal immediately, let user see recommendations
          },
        },
        error: {
          render(response) {
            return response.data.response.data.message;
          },
          onClose: () => {
            setIsOpen(false);
          },
        },
      }
    );
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      age: "",
      job: "",
      salary: "",
      goal: "",
      menabung: "",
      danaDarurat: "",
      produkBanking: "",
      risikoInvestasi: "",
    },
    onSubmit,
  });

  console.log(values);

  const ageOptions = [
    { label: "17–25 tahun", value: "Remaja" },
    { label: "26–35 tahun", value: "Dewasa_Muda" },
    { label: "36–45 tahun", value: "Dewasa" },
    { label: "46–55 tahun", value: "Paruh_Baya" },
    { label: "56–60 tahun", value: "Pra_Pensiun" },
    { label: "61+ tahun", value: "Pensiun_Atau_Senior" },
  ];

  const jobOptions = [
    { label: "Pelajar atau Mahasiswa", value: "Pelajar_Atau_Mahasiswa" },
    { label: "Karyawan Swasta", value: "Karyawan_Swasta" },
    { label: "Aparatur Sipil Negara", value: "Aparatur_Sipil_Negara" },
    { label: "Wirausaha", value: "Wirausaha" },
    { label: "Tenaga Kesehatan", value: "Tenaga_Kesehatan" },
    { label: "Pensiunan", value: "Pensiunan" },
    { label: "Ibu Rumah Tangga", value: "Ibu_Rumah_Tangga" },
    { label: "Buruh", value: "Buruh" },
    { label: "Sopir atau Kurir", value: "Sopir_Atau_Kurir" },
    { label: "Tidak Bekerja", value: "Tidak_Bekerja" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  const salaryOptions = [
    { label: "< 2.000.000", value: "KURANG_DARI_DUA_JUTA" },
    { label: "2.000.000 - 5.000.000", value: "DUA_JUTA_SAMPAI_LIMA_JUTA" },
    { label: "5.000.000 - 10.000.000", value: "LIMA_JUTA_SAMPAI_SEPULUH_JUTA" },
    {
      label: "10.000.000 - 20.000.000",
      value: "SEPULUH_JUTA_SAMPAI_DUA_PULUH_JUTA",
    },
    {
      label: "20.000.000 - 50.000.000",
      value: "DUA_PULUH_JUTA_SAMPAI_LIMA_PULUH_JUTA",
    },
    { label: "> 50.000.000", value: "LEBIH_DARI_LIMA_PULUH_JUTA" },
  ];

  const goalOptions = [
    { label: "Menabung", value: "MENABUNG" },
    { label: "Investasi", value: "INVESTASI" },
    { label: "Kredit", value: "KREDIT" },
    { label: "Perencanaan Pensiun", value: "PERENCANAAN_PENSIUN" },
  ];

  const getProductDetails = (productName) => {
    const details = {
      KUR: {
        title: "How To Closing - KUR",
        content: `📌 Pertanyaan Umum untuk Menggali Kebutuhan
Usaha Bapak/Ibu bergerak di bidang apa dan sudah berjalan berapa lama?

Lokasi usaha Bapak/Ibu di mana?

Siapa saja target pelanggan Bapak/Ibu? (contoh: retail, fleet kendaraan, pabrik, dll.)

Berapa rata-rata omzet usaha per bulan?

Apa tantangan terbesar Bapak/Ibu dalam mengembangkan usaha saat ini?

Apakah Bapak/Ibu pernah menggunakan pinjaman usaha sebelumnya?

Kalau boleh tahu, untuk keperluan apa Bapak/Ibu ingin menambah modal usaha?
➔ (contoh: pembelian stok ban, peralatan tambal, renovasi bengkel, dll.)

Saat ini stok ban Bapak/Ibu cukup untuk berapa lama? Biasanya beli ban dari mana?

📌 Pertanyaan untuk Mengetahui Kelayakan & Potensi
Apakah usaha Bapak/Ibu sudah memiliki izin usaha (NIB/SIUP)?

Berapa jumlah karyawan di usaha Bapak/Ibu?

Apakah Bapak/Ibu memiliki pembukuan usaha atau catatan penjualan?

Bagaimana sistem pembayarannya—lebih banyak tunai atau kredit?

Apakah Bapak/Ibu memiliki kerja sama dengan supplier tertentu?

📌 Pertanyaan untuk Menawarkan Solusi KUR
Kalau ada tambahan modal dengan bunga ringan, apa rencana Bapak/Ibu ke depan?

Apakah Bapak/Ibu tertarik dengan pembiayaan yang angsurannya ringan dan tanpa agunan?

Berapa nominal tambahan modal yang ideal menurut Bapak/Ibu?

Kapan rencana Bapak/Ibu mau mulai mengajukan tambahan modal ini?

Apakah Bapak/Ibu ingin saya bantu hitungkan simulasi angsuran KUR?`,
      },
      "Kartu Kredit": {
        title: "How To Closing - Kartu Kredit",
        content: `📌 Pertanyaan Umum – Kenalan & Kondisi Keuangan
Boleh saya tahu, Bapak/Ibu saat ini bekerja di mana?

Sudah berapa lama Bapak/Ibu bekerja di perusahaan tersebut?

Posisi/jabatan Bapak/Ibu saat ini apa?

Kira-kira penghasilan tetap Bapak/Ibu per bulan berapa, kalau boleh tahu?

Apakah Bapak/Ibu memiliki penghasilan tambahan di luar gaji? (freelance, bisnis sampingan, dll.)

Saat ini Bapak/Ibu sudah punya kartu kredit dari bank lain?

Biasanya kartu kreditnya dipakai untuk apa saja? (belanja online, travel, bayar tagihan, dll.)

📌 Pertanyaan untuk Gali Kebutuhan
Saat ini apa kendala Bapak/Ibu dengan kartu kredit yang sudah dimiliki?
➔ (limit kurang? promo kurang? biaya tinggi?)

Kalau Bapak/Ibu punya kartu kredit tambahan, Bapak/Ibu mau pakai untuk keperluan apa?
➔ (belanja harian, cicilan barang elektronik, perjalanan bisnis, dll.)

Biasanya Bapak/Ibu lebih suka kartu kredit dengan keuntungan apa?
➔ (cashback, point reward, cicilan 0%, travel benefit, dll.)

📌 Pertanyaan untuk Tawarkan Solusi
Kalau ada kartu kredit dengan limit sesuai kebutuhan Bapak/Ibu dan promo sesuai gaya belanja, apakah Bapak/Ibu tertarik?

Berapa limit ideal menurut Bapak/Ibu?

Apakah Bapak/Ibu lebih suka kartu kredit dengan iuran tahunan ringan atau malah yang banyak benefit meski iurannya sedikit lebih tinggi?

Kalau saya bantu proseskan pengajuan kartu kredit, kapan Bapak/Ibu punya waktu luang untuk saya bantu lengkapi data?

Apakah saya boleh kirimkan simulasi benefit atau syarat lengkapnya ke WhatsApp/email Bapak/Ibu?`,
      },
      "Livin Merchant & EDC": {
        title: "How To Closing - Livin Merchant & EDC",
        content: `📌 Pertanyaan Umum – Gali Profil Usaha
Usaha Bapak/Ibu bergerak di bidang apa?

Lokasi usaha Bapak/Ibu di mana?

Sudah berapa lama usahanya berjalan?

Jam operasional usaha Bapak/Ibu setiap hari dari jam berapa sampai jam berapa?

Siapa saja pelanggan Bapak/Ibu? (umum, langganan, corporate)

📌 Pertanyaan untuk Gali Sistem Pembayaran
Saat ini Bapak/Ibu melayani pembayaran non-tunai?
➔ (transfer, QRIS lain, EDC bank lain?)

Pembayaran tunai atau non-tunai lebih banyak?

Kalau non-tunai, biasanya metode apa yang paling sering dipakai pelanggan?
➔ (QRIS, kartu debit, kartu kredit, e-wallet)

Pernah mengalami kendala pembayaran? Misalnya pelanggan tidak bawa uang tunai atau ingin gesek kartu?

Apakah Bapak/Ibu pernah pakai EDC sebelumnya? Bank mana?

📌 Pertanyaan untuk Gali Minat & Solusi
Kalau ada mesin EDC Mandiri, apakah Bapak/Ibu tertarik bisa terima pembayaran debit & kredit dari semua bank?

Bapak/Ibu juga mau punya QRIS yang saldo langsung masuk ke rekening usaha Bapak/Ibu di Mandiri?

Kalau pelanggan Bapak/Ibu bisa bayar lebih praktis (gesek atau scan QR), kira-kira bisa bantu naikin omzet nggak?

Biasanya omzet harian Bapak/Ibu berapa?

Apakah Bapak/Ibu mau saya bantu proses pendaftaran Livin' Merchant dan EDC? Prosesnya cepat, tidak ribet, dan saldo masuk langsung ke rekening Mandiri Bapak/Ibu.`,
      },
      FLPP: {
        title: "How To Closing - FLPP",
        content: `📌 Apa Itu FLPP?
FLPP adalah program pembiayaan rumah subsidi dari pemerintah (biasanya lewat bank penyalur seperti Bank Mandiri) dengan:
✅ Bunga tetap & rendah (misal 5% per tahun)
✅ Tenor panjang (bisa sampai 20 tahun)
✅ Cicilan ringan
✅ Disubsidi pemerintah (developer kerja sama)

Cocok untuk Masyarakat Berpenghasilan Rendah (MBR) yang mau punya rumah pertama.

📌 Cara Menawarkan FLPP – Step by Step
1️⃣ Gali Kebutuhan Calon Debitur
Pertanyaan untuk mendeteksi kebutuhan:

Apakah Bapak/Ibu sudah punya rumah sendiri?

Saat ini tinggal di mana? Masih ngontrak/kos?

Apakah Bapak/Ibu punya keinginan punya rumah sendiri?

Sudah pernah coba ajukan KPR sebelumnya?

2️⃣ Tanya Penghasilan & Status Pekerjaan
Karena FLPP khusus MBR, pastikan syaratnya terpenuhi:

Boleh saya tahu penghasilan Bapak/Ibu per bulan berapa?

Bapak/Ibu bekerja di mana? Sudah berapa lama?

Apakah Bapak/Ibu sudah menikah?

Apakah rumah ini untuk ditinggali sendiri (bukan untuk disewakan)?

3️⃣ Jelaskan Manfaatnya
"Kalau Bapak/Ibu masuk kriteria MBR, bisa dapat KPR FLPP dengan bunga hanya 5% flat per tahun, cicilan ringan, DP ringan juga. Sudah banyak nasabah yang terbantu, cocok untuk punya rumah pertama."

4️⃣ Sampaikan Persyaratan
Singkat & jelas:
✅ Belum pernah punya rumah
✅ Penghasilan sesuai batas MBR (misalnya max Rp 8 juta)
✅ Status kerja tetap & ada slip gaji
✅ Rumah untuk dihuni sendiri

5️⃣ Beri Contoh Simulasi
"Kalau harga rumahnya Rp 180 juta, DP 5%, cicilan per bulan sekitar Rp 1 jutaan tergantung tenor. Jauh lebih ringan daripada bayar kontrakan."

6️⃣ Pancing Komitmen
"Kalau Bapak/Ibu mau, saya bisa bantu hitungkan simulasi & cek syaratnya. Mau saya bantu proseskan sekarang?"

📌 Contoh Script Penawaran FLPP
"Selamat pagi Bapak/Ibu, saya lihat Bapak/Ibu sedang cari rumah untuk keluarga ya? Kalau boleh tahu, sudah punya rumah sendiri belum?
Kalau belum, Bapak/Ibu bisa pakai program KPR FLPP dari pemerintah. Bunga tetap 5% per tahun, cicilan ringan, DP juga ringan. Syaratnya gampang, cocok untuk keluarga muda atau pekerja tetap.
Kalau berkenan, saya bisa bantu cek kriteria dan hitungkan cicilan rumahnya. Kapan saya bisa kirim brosur & simulasi ke Bapak/Ibu?"

📌 Tips Tambahan
✅ Dekati developer rumah subsidi → mereka juga butuh bank penyalur.
✅ Bawa brosur simulasi.
✅ Jelaskan kemudahan proses → cukup slip gaji, KTP, KK.
✅ Siap bantu survei & appraisal.`,
      },
      KPR: {
        title: "How To Closing - KPR",
        content: `📌 Apa Itu KPR?
KPR = Kredit Pemilikan Rumah.
Digunakan untuk:
✅ Membeli rumah baru (subsidi/non-subsidi)
✅ Rumah second
✅ Apartemen
✅ Renovasi/Take Over KPR lama ke bank lain

Targetnya: keluarga muda, pasangan baru menikah, pekerja tetap, karyawan, profesional.

📌 Cara Menawarkan KPR – Step by Step
1️⃣ Gali Kebutuhan Nasabah
Pertanyaan dasar:

Apakah Bapak/Ibu sudah punya rumah sendiri?

Saat ini tinggal di mana? Masih ngontrak/kos?

Sudah punya rencana beli rumah di lokasi mana?

Rumah yang diinginkan tipe apa? Baru/second?

Sudah punya developer incaran?

2️⃣ Gali Kemampuan Finansial
Untuk memastikan layak:

Boleh tahu pekerjaan Bapak/Ibu? Di perusahaan mana?

Sudah berapa lama bekerja?

Penghasilan tetap per bulan berapa?

Apakah ada penghasilan tambahan? (usaha, freelance)

Sudah pernah punya pinjaman lain? (Kartu kredit, KTA, cicilan kendaraan)

3️⃣ Jelaskan Keuntungan KPR
Berikan poin simple:
✅ DP ringan (bisa 10% atau sesuai program)
✅ Tenor panjang (bisa sampai 20 tahun)
✅ Bunga bersaing & bisa fixed di awal
✅ Angsuran tetap & terjangkau
✅ Proses cepat, aman, & terdaftar di OJK

4️⃣ Sampaikan Simulasi Ringkas
"Contohnya kalau rumah senilai Rp 500 juta, DP 10% berarti Rp 50 juta, sisanya bisa dicicil. Kalau tenor 15 tahun, cicilan sekitar Rp 4 jutaan per bulan, tergantung suku bunga & profil nasabah."

5️⃣ Pancing Komitmen
"Kalau Bapak/Ibu cocok, saya bisa bantu hitungkan simulasi detail dan ajukan KPR-nya. Mau saya bantu proseskan sekarang?"

📌 Contoh Script Menawarkan KPR
Untuk Telepon/Chat:

"Selamat pagi Bapak/Ibu, saya dari [Nama Bank]. Boleh saya tahu, apakah Bapak/Ibu punya rencana membeli rumah dalam waktu dekat?
Kalau boleh tahu, sudah ada rumah yang diincar?
Kami punya program KPR dengan DP ringan, tenor panjang, dan bunga spesial. Prosesnya cepat dan aman, cocok untuk keluarga muda.
Kalau Bapak/Ibu mau, saya bisa bantu hitungkan simulasi cicilan dan syaratnya. Kapan saya bisa kirimkan brosur & simulasi cicilan ke WhatsApp Bapak/Ibu?"

📌 Tips Tambahan
✅ Bawa brosur/listing rumah/developer rekanan → kalau bisa tunjukkan unit ready stock.
✅ Siap dengan simulasi cicilan per harga rumah.
✅ Bantu jelaskan dokumen: slip gaji, NPWP, KTP, KK, rekening koran.
✅ Tawarkan jemput bola: "Saya siap bantu jemput berkas atau bantu isi formulir."`,
      },
      KSM: {
        title: "How To Closing - KSM",
        content: `📌 Apa Itu KSM?
Kredit Serbaguna Mandiri (KSM) adalah pinjaman tanpa agunan untuk kebutuhan pribadi, biasanya ditujukan untuk:
✅ Karyawan tetap (swasta/pemerintah/ASN)
✅ Pensiunan
✅ Tenor panjang (sampai 15 tahun, tergantung segmentasi)
✅ Angsuran tetap
✅ Dana bisa digunakan untuk berbagai keperluan: renovasi rumah, biaya pendidikan, pernikahan, modal tambahan, dll.

📌 Cara Menawarkan KSM – Step by Step
1️⃣ Gali Kebutuhan Calon Debitur
Pertanyaan untuk memancing:

Bapak/Ibu saat ini bekerja di mana?

Sudah berapa lama bekerja di sana?

Boleh tahu status kerjanya sudah tetap?

Apakah Bapak/Ibu ada rencana untuk renovasi rumah, biaya sekolah anak, biaya pernikahan, atau kebutuhan mendesak lain?

Sudah pernah punya pinjaman serbaguna sebelumnya?

2️⃣ Jelaskan Manfaat KSM
✅ Proses cepat & mudah
✅ Plafon pinjaman besar (tergantung gaji)
✅ Tenor panjang, cicilan ringan
✅ Angsuran tetap setiap bulan
✅ Tidak perlu jaminan/agunan

3️⃣ Berikan Simulasi Kasar
"Contohnya kalau gaji Bapak/Ibu Rp 5 juta, bisa dapat pinjaman sampai Rp 100 juta, cicilan per bulan sekitar Rp 1 jutaan untuk tenor 10 tahun. Angsurannya ringan & tetap."

4️⃣ Sampaikan Persyaratan Utama
Syaratnya simpel:
✅ Karyawan tetap min. masa kerja 1-2 tahun
✅ Slip gaji & SK pengangkatan
✅ KTP, NPWP, KK
✅ Usia sesuai ketentuan (maks. 55-60 tahun, tergantung segmentasi)

5️⃣ Pancing Komitmen
"Kalau Bapak/Ibu mau, saya bisa bantu hitungkan plafon & cicilan. Mau saya bantu proseskan sekarang? Cukup siapkan slip gaji & KTP saja dulu."

📌 Contoh Script Menawarkan KSM
Untuk Telepon/Chat:

"Selamat pagi Bapak/Ibu, saya lihat Bapak/Ibu bekerja di [instansi/perusahaan]. Kalau boleh tahu, apakah ada rencana untuk renovasi rumah, biaya sekolah, atau keperluan mendesak?
Kalau ada, saya bisa bantu proseskan KSM Mandiri. Plafon pinjaman besar, angsuran ringan, tenor panjang, dan tanpa jaminan.
Kalau Bapak/Ibu tertarik, saya bisa hitungkan simulasi plafon & cicilan sesuai gaji. Mau saya bantu sekarang?"

📌 Tips Tambahan
✅ Fokus ke segmentasi gaji & status karyawan (tetap atau outsourcing).
✅ Siapkan brosur simulasi plafon pinjaman sesuai gaji.
✅ Jelaskan proses cepat (1-2 minggu cair).
✅ Tawarkan jemput berkas/scan dokumen.`,
      },
    };

    return details[productName] || null;
  };

  return (
    <>
      <div className="shadow-input mx-auto w-full min-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black max-h-[70vh] overflow-y-scroll">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Andre Naibaho"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="age">Age</Label>
              <Select
                id="age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Age</option>
                {ageOptions.map((age) => (
                  <option key={age.value} value={age.value}>
                    {age.label}
                  </option>
                ))}
              </Select>
            </LabelInputContainer>
          </div>

          <div className="flex items-center gap-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="job">Job</Label>
              <Select
                id="job"
                name="job"
                value={values.job}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Job</option>
                {jobOptions.map((job) => (
                  <option key={job.value} value={job.value}>
                    {job.label}
                  </option>
                ))}
              </Select>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="salary">Salary</Label>
              <Select
                id="salary"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Salary</option>
                {salaryOptions.map((salary) => (
                  <option key={salary.value} value={salary.value}>
                    {salary.label}
                  </option>
                ))}
              </Select>
            </LabelInputContainer>
          </div>

          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <LabelInputContainer className="mb-4">
            <Label htmlFor="goal">Goal</Label>
            <Select
              id="goal"
              name="goal"
              value={values.goal}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Goal</option>
              {goalOptions.map((goal) => (
                <option key={goal.value} value={goal.value}>
                  {goal.label}
                </option>
              ))}
            </Select>
          </LabelInputContainer>

          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="my-4 flex flex-col space-y-4">
            <div>
              <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Apakah Anda rutin menabung setiap bulan?
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="menabung-ya"
                  name="menabung"
                  value="Ya"
                  checked={values.menabung === "Ya"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="menabung-ya"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Ya
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="menabung-tidak"
                  name="menabung"
                  value="Tidak"
                  checked={values.menabung === "Tidak"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="menabung-tidak"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Tidak
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Apakah Anda memiliki dana darurat?
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="dana-ya"
                  name="danaDarurat"
                  value="Ya"
                  checked={values.danaDarurat === "Ya"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="dana-ya"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Ya
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="dana-tidak"
                  name="danaDarurat"
                  value="Tidak"
                  checked={values.danaDarurat === "Tidak"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="dana-tidak"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Tidak
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Anda lebih nyaman dengan produk syariah atau konvensional?
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="produk-syariah"
                  name="produkBanking"
                  value="Syariah"
                  checked={values.produkBanking === "Syariah"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="produk-syariah"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Syariah
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="produk-konvensional"
                  name="produkBanking"
                  value="Konvensional"
                  checked={values.produkBanking === "Konvensional"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="produk-konvensional"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Konvensional
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                Apakah Anda bersedia mengambil risiko demi potensi keuntungan
                yang lebih tinggi?
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="risiko-ya"
                  name="risikoInvestasi"
                  value="Ya"
                  checked={values.risikoInvestasi === "Ya"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="risiko-ya"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Ya
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="risiko-tidak"
                  name="risikoInvestasi"
                  value="Tidak"
                  checked={values.risikoInvestasi === "Tidak"}
                  onChange={handleChange}
                />
                <Label
                  htmlFor="risiko-tidak"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Tidak
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 my-5">
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              type="submit"
            >
              Submit
              <BottomGradient />
            </button>
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

      {/* Product Recommendation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            {!selectedProduct ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                  Produk yang Cocok untuk Anda
                </h2>
                <div className="space-y-3">
                  {recommendedProducts.map((product, index) => (
                    <div
                      key={index}
                      className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                      onClick={() => setSelectedProduct(product.name)}
                    >
                      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {product.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setIsOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-br from-black to-neutral-600 text-white rounded-md hover:opacity-90 transition-opacity"
                  >
                    Tutup
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    {getProductDetails(selectedProduct)?.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    ← Kembali
                  </button>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <pre className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap font-sans">
                    {getProductDetails(selectedProduct)?.content}
                  </pre>
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setShowModal(false);
                      setIsOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-br from-black to-neutral-600 text-white rounded-md hover:opacity-90 transition-opacity"
                  >
                    Tutup
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
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
