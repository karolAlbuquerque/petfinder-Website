# PetFinder – Website Institucional

Landing page oficial do aplicativo Android **PetFinder**, hospedada no GitHub Pages.

---

## Estrutura do projeto

```
petfinder-website/
├── index.html          # Página principal (one-page)
├── privacy.html        # Política de Privacidade
├── terms.html          # Termos de Uso
├── CNAME               # Domínio customizado para GitHub Pages
├── sitemap.xml         # Sitemap para SEO
├── robots.txt          # Instruções para crawlers
├── css/
│   └── styles.css      # Design system completo
├── js/
│   └── script.js       # Interações e comportamentos
└── assets/
    └── logo.svg        # Logo do PetFinder
```

---

## Como publicar no GitHub Pages

### Pré-requisitos
- Conta no [GitHub](https://github.com)
- Git instalado na máquina
- (Opcional) Domínio próprio `petfinderapp.com.br`

---

### Passo 1 – Criar o repositório

1. Acesse [github.com/new](https://github.com/new)
2. Dê o nome **`petfinder-website`** (ou `seuusuario.github.io` para usar como site principal)
3. Deixe o repositório **público**
4. Clique em **Create repository**

---

### Passo 2 – Enviar os arquivos

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: lançamento inicial do site PetFinder"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/petfinder-website.git
git push -u origin main
```

---

### Passo 3 – Ativar o GitHub Pages

1. Acesse o repositório no GitHub
2. Vá em **Settings → Pages**
3. Em **Source**, selecione: `Deploy from a branch`
4. Branch: `main` / Pasta: `/ (root)`
5. Clique em **Save**

Após alguns minutos, o site estará disponível em:
`https://SEU_USUARIO.github.io/petfinder-website/`

---

### Passo 4 – Configurar domínio customizado (opcional)

Para usar `petfinderapp.com.br`:

1. No GitHub Pages (Settings → Pages), insira `petfinderapp.com.br` no campo **Custom domain**
2. No painel do seu registrador de domínio (ex: Registro.br, Hostinger), adicione os seguintes registros DNS:

**Registros A** (apontam para os IPs do GitHub Pages):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Registro CNAME** (para o subdomínio `www`):
```
www  →  SEU_USUARIO.github.io
```

3. Aguarde a propagação DNS (pode levar até 24h)
4. Marque a opção **Enforce HTTPS** no GitHub Pages

> O arquivo `CNAME` já está configurado com `petfinderapp.com.br` na raiz do projeto.

---

## Formulários (lista de espera e contato)

O site é totalmente estático. Para ativar os formulários em produção, integre com um dos serviços abaixo:

### Opção 1 – Formspree (recomendado, gratuito)
1. Crie uma conta em [formspree.io](https://formspree.io)
2. Crie um novo formulário e copie o endpoint (ex: `https://formspree.io/f/xabc1234`)
3. Em `js/script.js`, substitua o bloco de simulação de envio por:

```javascript
fetch('https://formspree.io/f/SEU_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: name.value, email: email.value })
})
.then(res => {
  if (res.ok) {
    waitlistForm.hidden = true;
    waitlistSuccess.hidden = false;
  }
});
```

### Opção 2 – EmailJS (sem backend)
1. Crie conta em [emailjs.com](https://www.emailjs.com)
2. Configure um serviço de e-mail e um template
3. Integre via SDK do EmailJS

### Opção 3 – Netlify Forms (se migrar para Netlify)
Adicione `netlify` ao `<form>` e faça deploy no Netlify.

---

## Atualizar conteúdo

Para atualizar textos, imagens ou seções:

1. Edite os arquivos localmente
2. Faça commit e push:

```bash
git add .
git commit -m "update: descrição da mudança"
git push
```

O GitHub Pages atualiza automaticamente em 1–2 minutos.

---

## SEO

- Atualize as meta tags em `index.html` com a URL real após o deploy
- Substitua `assets/og-image.png` por uma imagem real (1200×630px) para Open Graph
- Submeta o `sitemap.xml` no [Google Search Console](https://search.google.com/search-console)

---

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 com Custom Properties (sem framework)
- JavaScript vanilla (sem dependências)
- Google Fonts (Nunito + Inter)
- SVG inline para ícones e logo

---

## Licença

© 2026 PetFinder. Todos os direitos reservados.
