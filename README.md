# Oxid

An open-source, cross-platform AI-powered coding tool. A free alternative to Bolt.new and Cursor that runs entirely on your local machine.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## Overview

Oxid is a desktop application that brings AI-powered coding assistance to your local development environment. Unlike cloud-based solutions, Oxid runs entirely on your machine, ensuring your code and API keys stay private.

### Key Features

- 🖥️ **Desktop-First**: Native desktop app built with Tauri for optimal performance
- 🔐 **Privacy-Focused**: All processing happens locally, your code never leaves your machine
- 🎯 **Free & Open Source**: No subscription fees, bring your own API keys
- 🚀 **Fast & Lightweight**: Built with Rust and React for speed and efficiency
- 🔧 **Extensible**: Modular architecture designed for customization

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust (latest stable version)
- Platform-specific dependencies:
  - **Windows**: Microsoft C++ Build Tools
  - **macOS**: Xcode Command Line Tools
  - **Linux**: See [Tauri prerequisites](https://tauri.app/start/prerequisites/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oxid-dev/oxid.app.git
cd oxid.app
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run tauri dev
```

### Building

To create a production build:

```bash
npm run tauri build
```

The built application will be in `src-tauri/target/release/bundle/`.

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run tauri dev` - Start Tauri in development mode
- `npm run build` - Build web assets
- `npm run tauri build` - Build desktop application
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Desktop**: Tauri v2 (Rust)
- **State Management**: Zustand (planned)
- **Code Editor**: Monaco Editor (planned)
- **AI Integration**: Claude Code SDK (MVP), custom agent system (future)

## Roadmap

### MVP (v1.0)
- [ ] Basic UI with file explorer and code editor
- [ ] Claude Code SDK integration
- [ ] Project management (open, save, create)
- [ ] Syntax highlighting and basic code completion

### Future Releases
- [ ] Custom agent system with multi-LLM support
- [ ] Bring your own API keys (OpenAI, Anthropic, etc.)
- [ ] Local indexing and RAG capabilities
- [ ] Plugin system for extensibility
- [ ] Collaborative features

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Tauri](https://tauri.app/)
- Inspired by [Bolt.new](https://bolt.new) and [Cursor](https://cursor.sh)
- Powered by AI models from Anthropic, OpenAI, and others

## Support

- 📖 [Documentation](https://github.com/oxid-dev/oxid.app/wiki)
- 🐛 [Issue Tracker](https://github.com/oxid-dev/oxid.app/issues)
- 💬 [Discussions](https://github.com/oxid-dev/oxid.app/discussions)

---

**Note**: This project is in early development. Features and APIs are subject to change.