# Claude Notes

## Python / pip

Always create a local venv before installing any Python packages. Never use the system pip.

```bash
python3 -m venv .venv
.venv/bin/pip install <package>
.venv/bin/python3 script.py
```
