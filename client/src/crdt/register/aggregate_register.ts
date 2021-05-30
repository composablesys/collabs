// TODO: AggregateRegister: generalized LwwRegister
// that holds an MVR, may add metadata to values,
// and gives its value as some pure function of
// the sorted conflicting values, which are also
// exposed by conflicts().
// LwwRegister as a special case.  More special cases if
// it seems warranted (e.g. FwwRegister), i.e., if
// it would be difficult to make oneself.
// Mention as other examples, e.g., a color averager.
