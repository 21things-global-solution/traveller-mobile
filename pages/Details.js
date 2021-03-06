import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '../components/Layout';
import { data } from '../data';
export default class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = async url => {
    await Linking.openURL(url);
  };

  render() {
    const { navigation, route } = this.props;
    const item = data.filter(item => item.id === route.params.itemId)[0];
    const phonePattern = /^(?<ddd>[0-9]{2})(?<initial>[0-9]{4,5})(?<end>[0-9]{4})$/g

    return (
      <Layout title={item.details.name} excerpt={`${item.details.stars} estrelas`}>
        <Image source={item.details.image} style={{ width: '100%', height: 350 }} />

        <View style={styles.content}>
          <View>
            <View style={styles.row}>
              <Text style={[styles.contentSize, styles.itemLabel]}>Endereço:</Text>
              <Text style={[styles.contentSize, styles.itemContent]}>{item.details.address}</Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.contentSize, styles.itemLabel]}>Telefone:</Text>
              <Text style={[styles.contentSize, styles.itemContent]}>{item.details.phone.replace(phonePattern, `($<ddd>) $<initial>-$<end>`)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.contentSize, styles.itemLabel]}>Preço:</Text>
              <Text style={[styles.contentSize, styles.itemContent]}>
                {item.details.price.toFixed(2)}
              </Text>
            </View>

            {item.details.site && (
              <View style={styles.row}>
                <Text style={[styles.contentSize, styles.itemLabel]}>Site:</Text>
                <Text
                  style={[styles.contentSize, styles.itemContent, styles.link]}
                  onPress={() => this.handleClick(item.details.site)}
                >
                  {item.details.site}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.btnClose} onPress={navigation.goBack}>
            <Text style={styles.btnCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  contentSize: {
    fontSize: 16,
  },
  content: {
    padding: 12,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    marginRight: 15,
    width: 75,
  },
  itemContent: {
    flexShrink: 1,
  },
  btnClose: {
    backgroundColor: '#f12',
    padding: 10,
    maxWidth: 100,
    borderRadius: 5,
    alignSelf: 'center',
  },
  btnCloseText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  link: {
    textDecorationLine: "underline",
    color: "blue"
  }
});
