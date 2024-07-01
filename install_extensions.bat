for /F "tokens=*" %%A in ('type "extensions.txt"') do (
  cls
  code --install-extension %%A
)