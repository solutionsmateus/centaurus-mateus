import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json(
      { message: "Nenhum arquivo enviado" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "tmp", file.name);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buffer);

  return new Promise((resolve) => {
    exec(`python "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        resolve(
          NextResponse.json(
            { message: `Erro ao executar: ${stderr}` },
            { status: 500 }
          )
        );
      } else {
        resolve(
          NextResponse.json({ message: `Executado com sucesso:\n${stdout}` })
        );
      }
    });
  });
}
