# CityShobHw

>1.	What plugins or extensions are best suited in the Angular + PrimeNG environment to achieve the goal and implement all functions? Provide a list or explain why additional plugins are not needed.


None of the additional plugins i have used are actually "Necessary", however they make life alot easier and i used them because i dont need to invent the wheel
 
 1. Primeng TreeComponent - used for making the tree layout
 2. tailwindCSS - used for quick styles and classes
 3. primeng icons - used for easy and simple icons
 4. rxjs - used for http request and to add debounce to search (it could be done with just setInterval and clearInterval but rxjs is shorter)
 5. reactive forms - used for getting the search input, could've just used a simple ngModelChange event but with reactive forms i can work with observables which is easier for me.
 6. Expressjs for server
 7. mongodb or any database for persistent data
 ---
>2.	In what format should data be received to display the result?

The data format i need in order to display the tree is based on the TreeNode interface provided by PrimeNg, but i only need the following in order to create the widget 
```
interface NodeDTO {
  isParent?: boolean;
  label: string;
  icon?: string;
  children?: NodeDTO[];
  data?: any;
  _id: string;
}
```

`isParent` is for me to know that this is the root node of the tree, its not needed for the `TreeNode` interface but i use it to add a custom class for each root node.

i have a function called `normalizeTreeData` which can be found on line 28 in `data.service.ts` and this function prepares the data and turns nodeDTO into TreeNode[] to be used in Primeng's tree

*in the database `children` is an array of objectIds with reference to the same collection

---
>3. ⦁	How to request data for displaying the result (format)?

the format in which i request the data is just a `GET api/nodes` this would return the 4 parents nodes together in an array with each children and nested children populated in a recursive function i wrote, it can be found in the backend repo [HERE](https://github.com/taha3rar/city-shob-backend-hw)

***it is worth noting that there is another way to get the data which i didnt use but what you can do is save each root in a "categories" collection, and keep all the children in the node, and then you can call each category independently for example `GET api/category/placemarks` but then you would have to call all 4 at once and use something like rxjs zip or merge to merge all requests and call them at once, but since i have control over the backend i did it this way.***

---
>4. ⦁	How to implement multilingual support for types and names, and what is the best way to do it?

To add translation you would use a tool called i18n which is a popular library for internationalization in angular, you need to add the attribute `i18n` to each text element you have in the html and also create an xlf file for each language, then you modify the angular.json file to build based on the language you want by passing --configuration then you can also add something to the settings in the app for the user to change language and have different builds for each language,

***you can also use a library called ngx-translate which might be easier but less customizable***

---

>5.⦁	What to do if the server cannot return the desired format and is forced to return bulky objects with fields in different writing styles? How to convert the data into the correct format? Provide an example of such a transformation

```
const mapper = {
  unitId: 'id',
  entityName: 'name',
  createdDate: 'createdAt',
  sum: 'sum',
};

const types = {
  unitId: 'number',
  entityName: 'string',
  createdDate: 'date',
  sum: 'number',
};
const data = {
  entityName: 'Test',
  createdDate: '2023-10-17T12:34:56.789Z',
  unitId: 12,
  sum: 3434,
};

const normalizeData = (data) => {
  const result = {};
  for (const key in data) {
    if (mapper[key]) {
      result[mapper[key]] = transformByType(key, data);
    }
  }
  return result;
};
const transformByType = (key, data) => {
  switch (types[key]) {
    case 'number':
      return parseFloat(data[key]);
    case 'date':
      return new Date(data[key]);
    default:
      return data[key];
  }
};
```
here i use `mapper` as an easy way to normalize the keys, then i use `types` with the key as the key and the value is the type, each type has a different transformation, strings dont need any transformation.
to make sure the code works you can copy paste it into the dev-tools console and call normalizeData(data), the result should be what you asked for.

>6. ⦁	Using a tool, create a flowchart demonstrating the widget's operation.

[flowchart](https://viewer.diagrams.net/index.html?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=flowchart.drawio#R7Vxtb9s2EP41xrIPDfRu%2B2PiJtmAruviAsU%2BFbREW2wkUqPo2OmvH18lW7RjpbUteVgQwNaJksiHx7vnjicP%2FEm%2BfqCgSP8gCcwGnpOsB%2F77ged5zjDgH0LyoiTDIFKCBUWJErm1YIq%2BQy10tHSJElhuNWSEZAwV28KYYAxjtiUDlJLVdrM5ybafWoAFtATTGGS29AtKWKqkI29Yy3%2BDaJGaJ7vRWJ3JgWmsR1KmICGrDZF%2FN%2FAnlBCmvuXrCcwEeAYXdd39nrNVxyjErM0Fq3ee%2B3kMp7f3X%2F95RH%2BNH26%2BR%2B98dZdnkC31gKcMUKZ7zF4MDJQscQLFndyBf7tKEYPTAsTi7IpPPJelLM%2F0abtnurPPkDK43hDpnj5AkkNGX3gTfTbQoGmtCfXhqp4C1%2BCabsAfaRnQs76oblwDw79obN6AU2DhZEEEcXIjFI4fxRkoSxRvo1JD6LyGEUy2FNJGaAODcAcERkZhBhh63lbjXbjoJ3wiiPekmoDx%2BHq0NQWu28C2JEsaQ33Zpt4dvNO4cSeucQvIrDvJiaoG%2FuNzF1pzdw9ZnAqjBBgYeFHGobudUf5tIb493H0WnSsQfxomwvr0bDVUAHa2HEaHl0PJKHmqbKa3jQm3hYVol68Xwm1czzOyilNueK4BxoRxxSX4q7gGZGiBecMMzsXUZGAGs0%2BkRKIBF1M11ttC6A6kd88c4%2FJ4uLtRA%2FihDfyuNeg6pwLeHbYwRNyCTPUhoSwlC4JBdldLG6aobvOBkEKj9w0y9qLdMVgy0lKnlVF4ZQDaO6ol%2F9pAo5bmsLWd%2ByncxxbsHwnNuXZygIwd4cREMAwkbB%2FC4jgVJz9TCD9yM9K5Fak4ldHmoGszYjq0pc1NczxdxjEsbSPMRy1OKzszIRmhXI4JFgo%2BR1nWEDUsiYANcZp3o8U5ShK5Nko%2BBQgvPshm74Na8qgBESLCLxc2ix%2Bm%2FEKIjQ2SCIW3%2FJ8PbeJch4OQ93XCj936mP%2BL5pRNCObdB0hOKQQlW8GSyfXJTSCYyZE6Z9ENNzysG6MdquGfTDVcSzXuAcr%2B14KTakHD31UrvzMtsHn3NOWAc7%2FAqTbtnUn1Ojep3i6TekkEwTj%2Bwwxh3CuG4Nlhxn8UeC84NvDyUh48g5eNBtqS7o1Qw9Fucr4vDm22953GnKsOHDX09C%2BdrrdWCr9ffN30ewP4R8hBpGIsnJBbs3DAV2w7liN4jqB%2FZNyOcX7HPNA2QQ5nU0ziNxPDyFDJIOaEyMQ96jLP4WE8XoiciYqBSgioyLX0DO6KxnTnqC%2FdNBg3cNhf9Ms0eLtyuSronBPpMOoZiP5ZEnPiXSkxvOENxsVaQmdOm1B1kqH4iZ8nWC4E%2BEzlNxSLD%2FUI3mX1FHWFNeUmM8YDggJ%2BJ2IktwWkiI8d0k35p1p4iOjO0RqarZWTrK7I7Xo1%2BZdOe73W7KtntNd2tHfrAuCEy7DMejnqIAdP4gCxX4RvmIH4aSHhFitFxuhcKD1IBHKhv3hWFrsWyLk9x6h73W6z%2BdRr3W6b9PX9fum2zYiMGS%2B5irfxFKM9niLe9BSEpZJYyb1gw0%2F16qm8hnpib7yGSaTFEKu7HWGpuU73a83eEOfWKQNFKaZEJfTjJRWDzETPobR1MKnMHDTGT7UVWUd%2BhZht2UjMd8cGzfW6R3nXwroki%2Ba3DotHvbJovu2tTYDmXCWUFAlZ4V97YF6OSUp7E2EH9p7Ghan9qKXaG6j7ovZ2vQIpoHC9RuelwQbC%2B6agrKx3DmQOI2g6ZQeDfEdZSGfUtD8abodhcUpIqfJEyhmSucI310FBDXeVYfrz44e%2FB3XuSLEkPT%2B9yN7VTKU%2F0HstjMtxStQOL%2F%2B2OwTnqWXbt1Pw5lK2YWN%2F1A8bN9pTyfazWxvmOfv6FY1fbX%2BavY2gRRFYr71Z0DaBGQx75c0COx%2BgLOWVKIbohr0dwaYOnYYSe12b1ND2Zhem4cO2Gt6vpGJg7418AbKubi4ThaHj5II2gLniCxBImvAEX1QdkGIUeGBtWony0YEJ1UXV3rVgctaknruMZNw71Q%2FsCL1UhTcVKaOwXGZssCfxseBKgntD19zeARy2iQXPRNdCr%2BXq74auWSyrNV1rkPSwWad2IroW%2Bm%2Bja%2BE5SlFCO%2FVzWc7MaOlhdQ6P7cx%2BSCtGw7dpxYH2J9IKO2p8hKUq%2BLgiKkMCFhfLKa2V5nRu9%2B0ywWXBmUi9vaDRN2mSgXy3kQGEJY%2B5ymVKSvXfc7gjK9aVD1bn9DjEG4dkmQn5DKqjla7XkXddpSSD2kPbE3xuCjRqzFTQ9h2n0clmqk2Bzrk8dNtthLO9HBhFW9Pl%2FaiPtm%2FlN2f0xK8HmqV%2BuY6xbVY%2B7FeUF108I2kLfHR0RvJzls3O3N2C%2BAkKH9J0AynJZ8vyLC4gFKbAqf%2B23xr2W76RdDJ%2FENlU6cLUtW0ZTtT2VfQzqaudi3iAMvEgr9VQqL257t%2FV9l%2FV4rDz2ovo0qvJorakKepXNVlkZ3wKUiwzxf2VLnNmjgTLj1OUJVQk0JrVkM23Y3uu71Hnv9wR2RVdFJYFkQHTCskoyhNhobOZvgR1sO8538oelG29jvOw85%2BEiOzAdqJ%2Fk0e%2FIZITvBCfqiYeoz78ysy1s%2Fk3CrdADfzTgcoP65%2F%2BUaFM%2FQNK%2Ft2%2F)
if the link doesnt work then check flowchart.drawio.svg 

