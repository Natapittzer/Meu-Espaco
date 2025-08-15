# Meu Espaço Pessoal

Um site pessoal completo para organizar arquivos, links, calendário e notas de forma simples e eficiente.

## 🚀 Funcionalidades

### 📁 Gerenciamento de Arquivos
- **Upload de arquivos** por drag & drop ou clique
- **Suporte a imagens, PDFs, documentos e textos**
- **Visualização de imagens** diretamente no site
- **Download de arquivos** com um clique
- **Lembretes por arquivo** - defina datas importantes
- **Limite de 10MB** por arquivo

### 🔗 Gerenciamento de Links
- **Adicionar links** com título e descrição
- **Abertura em nova aba** automaticamente
- **Edição e exclusão** de links
- **Lembretes por link** - nunca mais perca um link importante
- **Organização visual** em cards

### 📅 Calendário Integrado
- **Visualização mensal** completa
- **Adição de eventos** com data, hora e descrição
- **Navegação entre meses** com setas
- **Indicadores visuais** para dias com eventos
- **Visualização de eventos** ao clicar no dia
- **Destaque para o dia atual**

### 📝 Sistema de Notas
- **Criação de notas** com título e conteúdo
- **Edição e exclusão** de notas
- **Lembretes por nota** - organize suas tarefas
- **Interface limpa** e organizada
- **Persistência automática** dos dados

### 🔔 Sistema de Notificações
- **Notificações push** no navegador
- **Lembretes automáticos** baseados em datas
- **Verificação a cada minuto** de lembretes
- **Notificações visuais** no canto da tela
- **Diferentes tipos**: sucesso, aviso, erro

### 🎨 Interface Moderna
- **Tema escuro por padrão** (conforme solicitado)
- **Alternância para tema claro** com botão
- **Design responsivo** para mobile e desktop
- **Animações suaves** e transições
- **Cores suaves** e agradáveis aos olhos

### 💾 Armazenamento e Backup
- **LocalStorage** para persistência local
- **Exportação de dados** em JSON
- **Importação de backup** para restaurar dados
- **Salvamento automático** de todas as alterações
- **Backup com data** no nome do arquivo

## 🎯 Atalhos de Teclado

- **Ctrl + 1**: Ir para Arquivos
- **Ctrl + 2**: Ir para Links  
- **Ctrl + 3**: Ir para Calendário
- **Ctrl + 4**: Ir para Notas
- **Ctrl + S**: Salvar dados manualmente

## 🛠️ Como Usar

### Instalação
1. Baixe todos os arquivos (`index.html`, `styles.css`, `script.js`)
2. Coloque-os na mesma pasta
3. Abra o `index.html` no seu navegador

### Uso Local
- O site funciona completamente offline
- Todos os dados são salvos no navegador
- Não precisa de servidor ou internet

### Hospedagem Online
- Pode ser hospedado em qualquer servidor web
- Funciona em GitHub Pages, Netlify, Vercel, etc.
- Mantém todas as funcionalidades

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- **Desktop** (tela lateral fixa)
- **Tablet** (layout adaptativo)
- **Mobile** (menu colapsável)

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com variáveis CSS
- **JavaScript ES6+** - Funcionalidades interativas
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📋 Recursos Técnicos

### Armazenamento
- **LocalStorage** para persistência
- **Base64** para arquivos
- **JSON** para estrutura de dados

### Segurança
- **Validação de arquivos** (tamanho e tipo)
- **Sanitização de dados** de entrada
- **Tratamento de erros** robusto

### Performance
- **Lazy loading** de imagens
- **Otimização de renderização**
- **Verificação eficiente** de lembretes

## 🎨 Personalização

### Cores
As cores podem ser facilmente alteradas editando as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --accent-color: #4f46e5;     /* Cor principal */
    --success-color: #10b981;    /* Verde */
    --warning-color: #f59e0b;    /* Amarelo */
    --error-color: #ef4444;      /* Vermelho */
}
```

### Tema
- **Tema escuro** é o padrão
- **Tema claro** disponível via botão
- **Preferência salva** automaticamente

## 🔄 Backup e Restauração

### Exportar Dados
1. Clique no botão "Exportar" na barra lateral
2. Um arquivo JSON será baixado
3. Guarde este arquivo em local seguro

### Importar Dados
1. Clique no botão "Importar" na barra lateral
2. Selecione o arquivo JSON de backup
3. Todos os dados serão restaurados

## 🚨 Limitações

- **Tamanho máximo** de arquivo: 10MB
- **Tipos suportados**: imagens, PDFs, documentos, textos
- **Armazenamento**: limitado ao espaço do navegador
- **Notificações**: requer permissão do usuário

## 🆘 Suporte

### Problemas Comuns

**Arquivos não carregam:**
- Verifique se o arquivo tem menos de 10MB
- Certifique-se que o tipo é suportado

**Dados não salvam:**
- Verifique se o LocalStorage está habilitado
- Tente limpar o cache do navegador

**Notificações não funcionam:**
- Permita notificações no navegador
- Verifique se o site está em HTTPS (para produção)

## 📈 Próximas Funcionalidades

- [ ] Categorização de itens
- [ ] Busca e filtros
- [ ] Compartilhamento de links
- [ ] Sincronização em nuvem
- [ ] Temas personalizáveis
- [ ] Modo offline avançado

## 📄 Licença

Este projeto é de uso livre para fins pessoais e educacionais.

---

**Desenvolvido com ❤️ para organização pessoal**
