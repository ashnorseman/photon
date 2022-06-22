# Photon

This project converts photon tokens to CSS variables and SASS placeholders.

## How to use

1. Install packages

```shell
npm install
```

2. Copy `.json` files to `./source` directory.

e.g.

```shell
/source
  interact-light.json
  signify-light.json
  white-label.json
```

3. Run script

```shell
npm start
```

4. Check the results in `./build` directory.

e.g.

```shell
/build
  /interact-light
    variables.css
    placeholders.scss
  /signify-light
    variables.css
    placeholders.scss
  /white-label
    variables.css
    placeholders.scss
```

5. Import the generated files to your project. Enjoy!

## Examples of generated code

### CSS variables

```css
{
  --photon-core-primary-00-primary: #fff;
  --photon-core-primary-05-primary: #fff5f7;
  --photon-core-primary-10-primary: #ffedee;
  --photon-core-primary-20-primary: #ffdadd;
  --photon-core-primary-40-primary: #ffb2b9;
  --photon-core-primary-60-primary: #ff8794;
  --photon-core-primary-80-primary: #ff506f;
  --photon-core-primary-100-primary: #e61e4e;
  --photon-core-primary-120-primary: #bf0039;
  --photon-core-primary-140-primary: #910029;
  --photon-core-primary-160-primary: #67001a;
  --photon-core-primary-180-primary: #40000d;
}
```

### SASS placeholders

```scss
%photon-core-h-1 {
  font-family: "Signify Relative", sans-serif;
  font-size: 80px;
  line-height: 96px;
  letter-spacing: -0.01em;
}
```
