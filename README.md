# Notebook Extend Markdown Renderer for MyST

A hacked together extension based on combining the notebook extension sample:  
https://github.com/microsoft/vscode-extension-samples/tree/main/notebook-extend-markdown-renderer-sample  

And the MyST-VS-code renderer extension  
https://github.com/executablebooks/myst-vs-code 

This is only intended as a demonstration and a hacky stopgap until notebook rendering is supported in the official myst-vs-code extension. 

Was inspired in response to https://github.com/executablebooks/myst-vs-code/issues/31  

This extension keeps the original `:emoji:` rendering support from the example, plus adds most of the MyST syntax from the original MyST extension. It doesn't allow any selection of MyST rendering extensions but does do dollarmath and amsmath since those are what I use in my day to day.  

The extension can be built youself, or I have provided a .vsix package you can install directly as an extension into vscode. 

