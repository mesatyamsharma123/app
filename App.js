import React  from  'react';
import {StyleSheet,Text,View,TouchableOpacity,Alert,Button} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
 export default class App extends React.Component{

   constructor(props){
     super(props);
     this.state={
       gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0],
        ],
       currentPlayer:1,
     }
   }
   componentDidMount(){
     this.initializeGame();
   }
   initializeGame=()=>{
     this.setState({gameState:
     [
        [0,0,0],
        [0,0,0],
        [0,0,0]
     ],
     currentPlayer:1,

   });
   }
   getWinner=()=>{
     
    const NUM_TILES=3;
     var arr =this.state.gameState;
     var sum;
     for (var i=0; i <NUM_TILES; i++){
       sum = arr[i][0]+arr[i][1]+arr[i][2];  
        if (sum==3){return 1;}
        else if(sum==-3){return -1;}
        else if(sum==-2){return 0;}
     }

        for (var i=0;i <NUM_TILES; i++){
          sum = arr[0][i]+arr[1][i]+arr[2][i]; 
           if (sum==3){return 1;}
           else if(sum==-3){return -1;}
        }
       sum = arr [0][0]+arr[1][1]+arr[2][2];

         if (sum==3){return 1;}
           else if(sum==-3){return -1;}


            sum = arr [2][0]+arr[1][1]+arr[0][2];

           if (sum==3){return 1;}
           else if(sum==-3){return -1;}
           else if(sum==-2){return -1;}
           return 0;
       
       }
       
   
   onTilePress=(row,col)=>{
     var value= this.state.gameState[row][col];
     if(value!==0){return;}

     var currentPlayer=this.state.currentPlayer;

     var arr=this.state.gameState.slice();
     arr[row][col]=currentPlayer;
     this.setState({gameState:arr});

     var nextPlayer=(currentPlayer==1)?-1:1;
     this.setState({currentPlayer:nextPlayer});

      var winner = this.getWinner();
      if (winner==1){
        Alert.alert("Player 1 won") ;
        this.initializeGame();    
        }
        else if(winner==-1){
          Alert.alert("Player 2  won") ;
        this.initializeGame();  
         }
       
         
     
   }
   onNewGamePress=()=>{
this.initializeGame();
   }
   renderIcon =(row,col)=>{
     var value=this.state.gameState[row][col];
     switch(value)
     {
     case 1:return <Icon name="close" style={styles.tilex}/>;
     case -1:return <Icon name= "circle-outline"style={styles.tileo}/>
     default:return<View/>
     }
   }
   render(){
     

   return( 
     <View style ={styles.container}>
    <View>
     <Text style={{fontSize:30,marginBottom:140,borderBottomWidth:3,borderWidth:3,alignItems:'center',padding:10,backgroundColor:'white',borderRadius:9,borderColor:'white',borderTopRightRadius:50}}>Tic-Tac-Toe </Text>
 </View>
<View style={{flexDirection:"row",}}>
    
    
     <TouchableOpacity onPress= {()=>this.onTilePress(0,0)}style={[styles.tile,{borderLeftWidth:0,borderTopWidth:0}]}>
      {this.renderIcon(0,0)}
     </TouchableOpacity> 


      <TouchableOpacity onPress= {()=>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0,}]}>
      {this.renderIcon(0,1)}
      </TouchableOpacity>


      <TouchableOpacity onPress= {()=>this.onTilePress(0,2)}style={[styles.tile,{borderTopWidth:0,borderRightWidth:0}]}>
      {this.renderIcon(0,2)}
     </TouchableOpacity>

     </View>
     


     <View style={{flexDirection:"row"}}>
      

      
      <TouchableOpacity onPress= {()=>this.onTilePress(1,0)}style={[styles.tile,{borderLeftWidth:0,}]}>
      {this.renderIcon(1,0)}
    </TouchableOpacity>
     
     
      <TouchableOpacity onPress= {()=>this.onTilePress(1,1)}style={[styles.tile,{}]}>{this.renderIcon(1,1)}
     </TouchableOpacity>
     
     
     <TouchableOpacity onPress= {()=>this.onTilePress(1,2)}style={[styles.tile,{borderRightWidth:0}]}>{this.renderIcon(1,2)}
     </TouchableOpacity>
</View>
      
      <View style={{flexDirection:"row"}}>


      <TouchableOpacity onPress= {()=>this.onTilePress(2,0)} style={[styles.tile,{borderBottomWidth:0,borderLeftWidth:0}]}> 
     {this.renderIcon(2,0)}
   </TouchableOpacity>
     
     <TouchableOpacity onPress= {()=>this.onTilePress(2,1)} style={[styles.tile,{borderBottomWidth:0,}]}>
     {this.renderIcon(2,1)}
     </TouchableOpacity>


     <TouchableOpacity onPress= {()=>this.onTilePress(2,2)} style={[styles.tile,{borderBottomWidth:0,borderRightWidth:0,}]}>
     {this.renderIcon(2,2)}
 </TouchableOpacity>

     </View>
     <View style={{paddingTop:50,marginTop:40}}>
     <Button style={{fontSize:30}} title="New game"onPress={this.onNewGamePress} />
         
     </View>
     <View>
      <Text style={{backgroundColor:'white',fontSize:15,marginTop:40,marginLeft:180,}}></Text>
    </View>
     </View>

   );
   }

 }
 const styles=StyleSheet.create(
   {
     container:{
       flex:1,
       backgroundColor:'black',
      
       alignItems:'center',
       justifyContent:'center',
   


     },
     tile:{
       borderWidth:10,
       width:100,
       height:100,
      borderColor:'yellow'
     },
     tilex:{
       fontSize:60,
      
       color:"red",
       
     },
      tileo:{
       fontSize:60,
       
       color:"green",
      
       



     }
  
     
  
   }
 );