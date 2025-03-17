# RN-Komb-V2
These changes Required in Node modules:
Path:
RN-Komb-V2/NodeModules/ReactNative/Index.js/line 436 to onward/
Change this to //

get ColorPropType(): $FlowFixMe {
-    invariant(
-      false,
-      'ColorPropType has been removed from React Native. Migrate to ' +
-        "ColorPropType exported from 'deprecated-react-native-prop-types'.",
-    );
+    return require('deprecated-react-native-prop-types').ColorPropType
   },
   get EdgeInsetsPropType(): $FlowFixMe {
-    invariant(
-      false,
-      'EdgeInsetsPropType has been removed from React Native. Migrate to ' +
-        "EdgeInsetsPropType exported from 'deprecated-react-native-prop-types'.",
-    );
+    return require('deprecated-react-native-prop-types').EdgeInsetsPropType
   },
   get PointPropType(): $FlowFixMe {
-    invariant(
-      false,
-      'PointPropType has been removed from React Native. Migrate to ' +
-        "PointPropType exported from 'deprecated-react-native-prop-types'.",
-    );
+    return require('deprecated-react-native-prop-types').PointPropType
   },
   get ViewPropTypes(): $FlowFixMe {
-    invariant(
-      false,
-      'ViewPropTypes has been removed from React Native. Migrate to ' +
-        "ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
-    );
+    return require('deprecated-react-native-prop-types').ViewPropTypes
   },
   
   this one//
   
get ColorPropType(): $FlowFixMe {
  console.warn('');
  return require('deprecated-react-native-prop-types').ColorPropType;
},

get EdgeInsetsPropType(): $FlowFixMe {
  console.warn('');
  return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
},

get PointPropType(): $FlowFixMe {
  console.warn('');
  return require('deprecated-react-native-prop-types').PointPropType;
},

get ViewPropTypes(): $FlowFixMe {
  console.warn('');
  return require('deprecated-react-native-prop-types').ViewPropTypes;
},
