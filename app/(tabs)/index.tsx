import { Image, StyleSheet, Platform, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { 
  AntDesign, 
  Entypo, 
  EvilIcons, 
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from '@expo/vector-icons';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [selectedIconSet, setSelectedIconSet] = useState('AntDesign');
  const [iconSize, setIconSize] = useState(24);

  // Example icons to display from each set
  const iconExamples = {
    AntDesign: ['home', 'setting', 'user', 'heart', 'star', 'appstore-o'],
    Entypo: ['home', 'cog', 'user', 'heart', 'star', 'app-store'],
    EvilIcons: ['archive', 'gear', 'user', 'heart', 'star', 'play'],
    Feather: ['home', 'settings', 'user', 'heart', 'star', 'play'],
    FontAwesome: ['home', 'gear', 'user', 'heart', 'star', 'play-circle-o'],
    FontAwesome5: ['home', 'cog', 'user', 'heart', 'star', 'play'],
    Fontisto: ['home', 'player-settings', 'person', 'heart', 'star', 'play-list'],
    Foundation: ['home', 'widget', 'torso', 'heart', 'star', 'play-video'],
    Ionicons: ['home', 'settings', 'person', 'heart', 'star', 'play'],
    MaterialCommunityIcons: ['home', 'cog', 'account', 'heart', 'star', 'play'],
    MaterialIcons: ['home', 'settings', 'person', 'favorite', 'star', 'play-arrow'],
    Octicons: ['home', 'gear', 'person', 'heart', 'star', 'play'],
    SimpleLineIcons: ['home', 'settings', 'user', 'heart', 'star', 'control-play'],
    Zocial: ['acrobat', 'github', 'twitter', 'facebook', 'instagram', 'pinterest'],
  };

  // Icon components to render based on selected icon set
  const renderIcons = () => {
    const iconNames = iconExamples[selectedIconSet] || [];
    
    const IconComponent = {
      AntDesign: AntDesign,
      Entypo: Entypo,
      EvilIcons: EvilIcons,
      Feather: Feather,
      FontAwesome: FontAwesome,
      FontAwesome5: FontAwesome5,
      Fontisto: Fontisto,
      Foundation: Foundation,
      Ionicons: Ionicons,
      MaterialCommunityIcons: MaterialCommunityIcons,
      MaterialIcons: MaterialIcons,
      Octicons: Octicons,
      SimpleLineIcons: SimpleLineIcons,
      Zocial: Zocial,
    }[selectedIconSet];

    return (
      <View style={styles.iconsContainer}>
        {iconNames.map((name, index) => {
          // Some icon sets might not have all the expected icon names
          // Wrap in try-catch to handle potential errors
          try {
            return (
              <View key={index} style={styles.iconWrapper}>
                <IconComponent name={name} size={iconSize} color="#007AFF" />
                <ThemedText style={styles.iconLabel}>{name}</ThemedText>
              </View>
            );
          } catch (error) {
            console.log(`Error rendering icon: ${name} from ${selectedIconSet}`, error);
            return null;
          }
        })}
      </View>
    );
  };

  // Icon set selector buttons
  const renderIconSetSelector = () => {
    const iconSets = Object.keys(iconExamples);
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.iconSetSelector}
        contentContainerStyle={styles.iconSetSelectorContent}
      >
        {iconSets.map((set) => (
          <TouchableOpacity
            key={set}
            style={[
              styles.iconSetButton,
              selectedIconSet === set && styles.iconSetButtonSelected
            ]}
            onPress={() => setSelectedIconSet(set)}
          >
            <ThemedText 
              style={[
                styles.iconSetButtonText,
                selectedIconSet === set && styles.iconSetButtonTextSelected
              ]}
            >
              {set}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // Size selector
  const renderSizeSelector = () => {
    const sizes = [16, 24, 32, 48];
    
    return (
      <View style={styles.sizeSelector}>
        <ThemedText style={styles.sectionTitle}>Icon Size:</ThemedText>
        <View style={styles.sizesContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                iconSize === size && styles.sizeButtonSelected
              ]}
              onPress={() => setIconSize(size)}
            >
              <ThemedText 
                style={[
                  styles.sizeButtonText,
                  iconSize === size && styles.sizeButtonTextSelected
                ]}
              >
                {size}px
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Vector Icons Demo</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.demoContainer}>
        <ThemedText type="subtitle">Expo Vector Icons</ThemedText>
        <ThemedText>
          This demo shows how to use the @expo/vector-icons library. Select an icon set and size below to see examples.
        </ThemedText>
        
        {renderIconSetSelector()}
        {renderSizeSelector()}
        
        <ThemedText style={styles.sectionTitle}>Example Icons:</ThemedText>
        {renderIcons()}
        
        <ThemedView style={styles.usageExample}>
          <ThemedText type="subtitle">Usage Example:</ThemedText>
          <ThemedText style={styles.codeBlock}>
            {`import { ${selectedIconSet} } from '@expo/vector-icons';\n\n<${selectedIconSet} name="${iconExamples[selectedIconSet]?.[0] || 'home'}" size={${iconSize}} color="#007AFF" />`}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Documentation</ThemedText>
        <ThemedText>
          For more information, visit the Expo Vector Icons documentation.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  demoContainer: {
    gap: 16,
    marginBottom: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  iconSetSelector: {
    marginVertical: 12,
  },
  iconSetSelectorContent: {
    paddingRight: 16,
  },
  iconSetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  iconSetButtonSelected: {
    backgroundColor: '#007AFF',
  },
  iconSetButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  iconSetButtonTextSelected: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  sizeSelector: {
    marginBottom: 8,
  },
  sizesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  sizeButtonSelected: {
    backgroundColor: '#007AFF',
  },
  sizeButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sizeButtonTextSelected: {
    color: '#FFFFFF',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  iconWrapper: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
  usageExample: {
    marginTop: 8,
  },
  codeBlock: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 12,
    lineHeight: 18,
    overflow: 'hidden',
  },
});
