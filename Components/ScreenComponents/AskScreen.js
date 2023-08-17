import React,{useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import filter from "lodash.filter";

import Ionicons from '@expo/vector-icons/Ionicons';


const API_endpoint = "https://randomuser.me/api/?results=30";

const AskScreen = () => {

  const [SearchQuery, setSearchQuery] = useState("")

  const[isLoading, setisLoading] = useState(false);
  const[Data, setData] = useState([]);
  const[error,setError] = useState(null);
  const[fullData, setfullData] = useState("");
  const[search, setsearch] = useState(false);

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
      setsearch(!search);

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

        { 
          SearchQuery !== '' && 
          <FlatList 
                  data= {Data}
                  keyExtractor = {(item) => item.login.username} // use unqiue thing here
                  
                  renderItem = {  ({item}) => (

                      <View>
                      
                        <View style={styles.itemContainer}>

                                      <Image 
                                                source ={{uri :item.picture.thumbnail}}
                                                style={styles.image}
                                      />   

                                      <Text style={styles.textName}>{item.name.first}</Text> 

                                      <Ionicons
                                              name="md-checkmark-circle-outline" // The name of the icon you want to use
                                              size={17}     // Size of the icon
                                              color="black" // Color of the icon
                                              style={{ marginLeft:10}}
                                        />
                          </View>

                          <View style={{flexDirection:'row',alignItems:'center'}}>

                                      <Text style={styles.textEmail}>{item.email}</Text>

                                      <View>
                                                    <TouchableOpacity style={styles.button}>
                                                      <Text style={styles.buttonText}>Ask</Text>
                                                    </TouchableOpacity>

                                      </View>

                          </View>

                      </View>

                  ) }
            />  
        }

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
  },
  
  button: {
    backgroundColor: 'lightgreen',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 13,
    left:10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AskScreen;

