"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Selecione um arquivo primeiro.");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/run-script", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Resposta do servidor");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Executar Script Python</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enviar e Executar
      </button>
    </main>
  );
}
