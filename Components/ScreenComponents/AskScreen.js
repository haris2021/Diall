import React,{useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import filter from "lodash.filter";

const API_endpoint = "https://randomuser.me/api/?results=30";

const AskScreen = () => {

  const [SearchQuery, setSearchQuery] = useState("")


  const[isLoading, setisLoading] = useState(false);
  const[Data, setData] = useState([]);
  const[error,setError] = useState(null);
  const[fullData, setfullData] = useState("");

  useEffect( ()=>{

    setisLoading(true);
    fetchData(API_endpoint)

  },[])

  const handleSearch = (query) =>
  {
      setSearchQuery(query);

      const formattedquery = query.toLowerCase();

      const filtereddata = filter(fullData, (user) => {

          return contains(user, formattedquery);

      });

      setData(filtereddata);

  }

  const contains =({name, email}, query) => {

    const {first, last} = name
    if(first.includes(query) || last.includes(query) || email.includes(query))
    return true;
    else
    return false;

  }


  const fetchData = async(url) => {

    try
    {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      setfullData(json.results);
      console.log(json.results);
      setisLoading(false);

    }
    catch(error)
    {
      setError(true);
      console.log(error);
    }

  }

  // To know what should happen if isLoading is true.
  if(isLoading)
  {
     return(

      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="#550dc"/>
      </View>

     );
  }

  // error handling if error comes
  if(error)
  {
      return(

        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text>
                Error in fetching data.. Please check network connectivity.
              </Text>
        </View>

      );

  }



  return (

    // <View>
    //   <Text>ask</Text>
    // </View>

    <SafeAreaView  style={{flex:1, marginHorizontal:80, top:20}} >  
    
        <TextInput
                        placeholder="Find a therapist.."
                        clearButtonMode = "always"
                        autoCapitalize = "none"
                        autoCorrect={false}                        
                        style={styles.searchbox}   
                        value = {SearchQuery}    
                        onChangeText = { (query) => handleSearch(query)}     
        />

        <FlatList 
          data= {Data}
          keyExtractor = {(item) => item.login.username} // use unqiue thing here
          renderItem = {  ({item}) => (

              <View style={styles.itemContainer}>

                  <Image 
                          source ={{uri :item.picture.thumbnail}}
                          style={styles.image}
                  />        
              
                  <View>

                     <Text style={styles.textName}>{item.name.first}</Text>
                      <Text style={styles.textEmail}>{item.email}</Text>

                  </View>
                      
              </View>

          ) }

        />  

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  searchbox : 
  {
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    borderRadius: 18, 
                                    backgroundColor: 'white',
                                    paddingHorizontal: 30, // Add some horizontal padding for better appearance
                                    paddingvertical : 10,
                                    height:40,
                                    width:300
  },
  textName:{
    fontSize:17,
    marginLeft:10,
    fontWeight:"600"
  },
  textEmail :{
    fontSize:14,
    marginLeft:10,
    color:"grey"
  },
  image:{
    width:35,
    height:30,
    borderRadius:65
  },
  itemContainer :{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10,
    marginRight:10,
    marginTop:20
  }
});

export default AskScreen;

