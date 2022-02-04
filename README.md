# PCFBootstrapCards
This PCF control turns a list of records into bootstrap style cards. The layout of this card is driven by 6-7 columns.

<table>
    <thead>
    </thead>
    <tbody>
        <tr>
            <td>Column 1</td>
            <td>Column 2</td>
        </tr>
        <tr>
            <td colspan=2>Column 3</td>
        </tr>
        <tr>
            <td colspan=2>Column 4</td>
        </tr>
        <tr>
            <td>Column 5</td>
            <td>Column 6</td>
        </tr>
    </tbody>
</table>

### Colored Stripe
Along with the first 6 columns, if you have any column with the following text, it's going to display as a colored line before the first column.
- bg-primary
- bg-secondary
- bg-light
- bg-dark
- bg-success
- bg-warning
- bg-danger
- bg-info

### Images in columns
If you have a gif, png, or jpg in one of the columns, it will render as an image in the cards. Each column position has different image formatting. The bottom two columns show a circular image as shown in the demonstration below. Column 3 and 4 show it without any formatting but scale it down. Column 1 and 2 clip the image.

### Demonstration of how the PCF control looks
![Demonstration](https://i.imgur.com/hrSX5NJ.png)
