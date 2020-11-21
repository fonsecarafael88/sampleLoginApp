import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    //Main theme colors
    palette: {
      primary: {
        main: '#33ad88',
      },
      secondary: {
        main: '#ededed',
      },
    },
    //Styling components
    overrides: {
        //Button
        MuiButton: {
          root: {
            borderRadius: 50,
          },
        },
        //Input
        MuiOutlinedInput:{
            root:{
                borderRadius: 50,
                paddingLeft: 38,
                //borderColor: '#000',
            },
            input:{
                paddingLeft: 0,
                color: "#000",
                fontWeight: "bold",
            },
            adornedStart: {
                paddingLeft: 38, 
            }
        },
        //Input Label
        MuiInputLabel:{
            root:{
                background: '#fff',
                paddingLeft: 8,
                paddingRight: 8,
                color: '#000',
                fontWeight: 'bold',
            },
            shrink:{
                transform: `translate(30px, -6px) scale(0.75) !important`,
            }
        }
    }
});

export default theme;