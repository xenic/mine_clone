function snow()
{
    var datenow = new Date();
    return escape(datenow.toGMTString());
}

function getRadioButtonValue(radio)
{
	for(i = 0; i < radio.length; i++)
	{
		if(radio[i].checked)
		{
			return radio[i].value;
		}
	}
}

function getRadioButtonValueByName(fieldName)
{
    //Check to make sure radio button is selected
    for(var i=0; i<eval("document.forms[0]." + fieldName + ".length"); i++)
    {
        if(eval("document.forms[0]." + fieldName + "[" + i + "].checked"))
        {
            return eval("document.forms[0]." + fieldName + "[" + i + "].value");
        }
    }
    return false;
}


function getCheckboxValue(checkbox)
{
	for(i = 0; i < checkbox.length; i++)
	{
		if(checkbox[i].checked)
		{
			alert(checkbox[i].value);
		}
	}
}

//Fisher–Yates Shuffle
function shuffle(myArray)
{
	var j, tmp;
	for(var i = myArray.length - 1; i > 0; i--)
	{
		j = Math.floor(Math.random() * (i + 1));
		tmp = myArray[i];
		myArray[i] = myArray[j];
		myArray[j] = tmp;
	}
	return myArray;
}
