<map version="0.9.0">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1459268344856" ID="ID_357127287" MODIFIED="1459268501083" TEXT="recipe-box app lifecycle">
<font NAME="SansSerif" SIZE="12"/>
<node CREATED="1459268431362" ID="ID_376566683" MODIFIED="1459268503310" POSITION="right" TEXT="App">
<node CREATED="1459268439090" ID="ID_421610767" MODIFIED="1459268460267" TEXT="RecipeDisplay">
<node CREATED="1459268475203" ID="ID_982376987" MODIFIED="1459268477734" TEXT="Recipe"/>
</node>
<node CREATED="1459268461128" ID="ID_1481800499" MODIFIED="1459268464392" TEXT="RecipeCreate"/>
<node CREATED="1459268464887" ID="ID_64387462" MODIFIED="1459268467583" TEXT="RecipeEdit"/>
<node CREATED="1459268485169" ID="ID_44157372" MODIFIED="1459268488065" TEXT="LocalStorage"/>
</node>
<node CREATED="1459268504032" ID="ID_896001838" MODIFIED="1459268507839" POSITION="right" TEXT="events">
<node CREATED="1459268508698" ID="ID_1927822914" MODIFIED="1459268525178" TEXT="click on edit button">
<node CREATED="1459268525975" ID="ID_732620723" MODIFIED="1459268558654" TEXT="shouldComponentUpdate"/>
<node CREATED="1459268559353" ID="ID_684043442" MODIFIED="1459268562841" TEXT="componentWillUpdate"/>
<node CREATED="1459268564086" ID="ID_1107146109" MODIFIED="1459268565707" TEXT="render"/>
<node CREATED="1459268566735" ID="ID_1289416672" MODIFIED="1459268573696" TEXT="componentDidUpdate"/>
<node CREATED="1459268585197" ID="ID_1086107580" MODIFIED="1459268603795" TEXT="After just one cycle, App&apos;s state is reset">
<node CREATED="1459268605409" ID="ID_1060381622" MODIFIED="1459268631110" TEXT="but app sends its state to RecipeEdit prior to its update">
<node CREATED="1459268637536" ID="ID_416323302" MODIFIED="1459268687795" TEXT="in turn, componentWillReceiveProps is gettign the value off the render. maybe it needs the value after APP&apos;s componentDidUpdate, because you are setting Apps state in its own render function"/>
</node>
</node>
</node>
</node>
<node CREATED="1459271567852" ID="ID_1645375732" MODIFIED="1459271570303" POSITION="right" TEXT="solution">
<node CREATED="1459271571432" ID="ID_174835444" MODIFIED="1459271646279" TEXT="it turns out I was just implementing the Edit component&apos;s willReceiveProps wrong. I was setting state to the old props on accident, instead of nextProps."/>
</node>
</node>
</map>
