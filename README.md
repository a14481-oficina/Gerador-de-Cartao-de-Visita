# Gerador de Cartão de Visita

Projeto web simples para criar e visualizar cartões de visita personalizados, com geração de QR Code e opções para baixar o cartão em PDF, imagem PNG e importação de contactos.

---

## Funcionalidades

- Preenchimento de dados básicos: Nome, Cargo, Empresa, Email, Telefone e Website.
- Visualização dinâmica do cartão de visita com design moderno.
- Geração automática de QR Code contendo os dados do contato (sem acentos para garantir compatibilidade).
- Download do cartão em formato PDF.
- Download do cartão em formato imagem PNG.
- Importação para aplicação de contactos.

---

## Tecnologias utilizadas

- HTML5
- CSS3 (com fonte Google Fonts Montserrat)
- JavaScript (Vanilla)
- Bibliotecas externas:
  - [QRCode.js](https://github.com/davidshimjs/qrcodejs) para geração do QR Code
  - [html2canvas](https://html2canvas.hertzen.com/) para captura do cartão em imagem
  - [jsPDF](https://github.com/parallax/jsPDF) para geração do PDF

---

## Como usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/a14481-oficina/Gerador-de-Cartao-de-Visita.git
   
2. Abra o arquivo index.html no navegador de sua preferência.  
3. Preencha os campos do formulário para personalizar o cartão.  
4. Veja a pré-visualização do cartão gerada automaticamente.  
5. Utilize os botões para:  
    - Download do cartão em PDF.
    - Download do cartão em imagem PNG.
    - Importar para o teu telemóvel ou aplicação de contactos.
