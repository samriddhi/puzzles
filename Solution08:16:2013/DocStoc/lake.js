
$(function() {
			$("#sbutton").click(function(){ 															//submit button clicked where the algo starts 
				var x = $(":input[name='xinput']").val(); 									//assign variables with value of input buttons
				var y = $(":input[name='yinput']").val();
				var z = $(":input[name='zinput']").val();
				//Exceptions that can occur in problem
				if(isNaN(+x) || isNaN(+y) || isNaN(+z)){										//check if input is not a number not needed in chrome
					alert("Value of inputs cannot be not number");
				}
				else if(+x==0 || +y==0 || +z==0){													//check if any of the input values are zeros
					 $("input[type=text], textarea").val("");								//empty the text field 	
					alert("Value of inputs cannot be zero");								//and send an alert
				}
				else if(+x < 0 || +y < 0 || +z < 0){														//check if any input is less than zero (negative)
					 $("input[type=text], textarea").val("");								//empty the text feild 
					 alert("Value of inputs cannot be negative");							//and send an alert 
				}	

				else if(+z > +x && +z > +y){
					alert("Value is z is greater than input.");
				}	
				else if(+z == +x || +z == +y){
					alert("Value of z is equal to bucket. So just one step required.");
				}	
				else if(+z % gcd(+x, +y) != 0){
					alert("This situation has no solution.");
				}
				else{
					bx = 0; 																// bucket x which can max up to x
					by = 0; 																//buckey y which can hold max y 
				    count1 = 0; 															//counting number of steps in first procedure
				    count2 = 0;
				    total = 0;																//counting number of steps in second procedure
				    while(bx != z && by != z){
				    	if(bx == 0){														//check if bucket x is empty 
				    	 bx = x;															//and fill
				    	 count1++;															//then increase count of steps
				    	}
				    	else if(by == y){													//check if bucket y is full 
				    		by = 0;															//and empty y 
				    		count1++;														//increase count of step
				    	}
				    	else{
				    	 total = +bx + +by;													//find the total amount of water in bucket x and y
				    	 by = (y<total)?y:total;												//find the amount of water that can go into bucket y
				    	 bx = total - by;													//remaining water in bucket x 
				    	 count1++;															//increase count of steps
				    	}
				    }
				    bx = 0;
				    by = 0;																	//same as above but starts with bucket y
				    while(bx !=z && by!=z){
				    	if(by == 0){
				    		by = y;
				    		count2++;
				    	}
				    	else if(bx == x){
				    		bx = 0;
				    		count2++;
				    	}
				    	else{
				    		total = +bx + +by;
				    		bx = x<total?x:total;
				    		by = total - bx;
				    		count2++;
				    	}
				    }
				    /*Checks which way had the smallest number of steps and then uses same algorithm to paste html content to page to show the steps dynamically*/
				    if(count1<count2){
				    	bx = 0;
				    	by = 0;
				    	count1 = 0;
				    	$("div#result").html('<h1>Solution</h1>');
				    	while(bx != z && by != z){
				    	if(bx == 0){														
				    	 bx = x;
				    	 count1++															
				    	 if(count1 == 1){
				    			$("div#result").append('<p> ' + count1 + ') Bucket X is empty and will be filled up with ' + x + ' gallons of water</p></div>');
				    			}
				    			else{
				    				$("div#result").append('<p> ' + count1 + ') Bucket X is empty and will be filled up with ' + x + ' gallons of water</p>');
				    			}															
				    	}
				    	else if(by == y){													 
				    		by = 0;	
				    		count1++														 
				    		$("div#result").append('<p> ' + count1 + ') Bucket Y is full with ' + y + 'and will be emptied to 0</p>');														
				    	}
				    	else{
				    	 total = +bx + +by;													
				    	 by = (y<total)?y:total;											
				    	 bx = total - by;	
				    	 count1++												
				    	$("div#result").append('<p> ' + count1 + ') Bucket X poured '+ by + '  gallons of water into Bucket Y. Now Bucket X has ' + bx + ' gallons of water.<br/> Bucket X: ' + bx + ' Bucket Y: ' + by + '</p>');														
				    	}
				    }
				    }
				    else{
				    	by = 0;
				    	bx = 0;
				    	count2 = 0;
				    	$("div#result").html('<h1>Solution</h1>');
				    	while(bx !=z && by!=z){
				    		if(by == 0){
				    			by = y;
				    			count2++;
				    			if(count2 == 1){
				    			$("div#result").append('<p> ' + count2 + ') Bucket Y is empty and will be filled up with ' + y + ' gallons of water</p></div>');
				    			}
				    			else{
				    				$("div#result").append('<p> ' + count2 + ') Bucket Y is empty and will be filled up with ' + y + ' gallons of water</p>');
				    			}
				    			//alert("in by == 0");
				    		}
				    		else if(bx == x){
				    			bx = 0;
				    			count2++;
				    			$("div#result").append('<p> ' + count2 + ') Bucket X is full with ' + x + ' and will be emptied to 0</p>');
				    			//alert("in bx == x");
				    		}
				    		else{
				    			total = +bx + +by;
				    			bx = x<total?x:total;
				    			by = total - bx;
				    			count2++;
				    			$("div#result").append('<p> ' + count2 + ') Bucket Y poured '+ bx + '  gallons of water into Bucket X. Now Bucket Y has ' + by + ' gallons of water<br/> Bucket X: ' + bx + ' Bucket Y: ' + by +'</p>');
				    			//alert("in else");
				    		}
				    	}
				    	//$("div").after("<p>Bucket X has" + bx + " amount of water Bucket Y has " + by + " amout of water </p><br/>")

				    }
				}
			});

			$("#rbutton").click(function(){ 												//this might be redundant,since reset button works without code
				 $("input[type=number], textarea").val("");													
			});
		});
		/*The gcd function is based upon Eulers Method and returns the gcd from variable b*/	
		function gcd(a, b){
			if(a>b){ 										//Assumed in gcd that a has the small value and b has the bigger value so swap to meet that condition.
				var temp; 
				temp = a;
				a = b;
				b = temp;
			}
			while(a!=0){									/*euler states*/
				var c = b%a
				b = a;
				a = c;
			}
				return b;
			};			