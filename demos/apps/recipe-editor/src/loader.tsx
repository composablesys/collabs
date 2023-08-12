import { WebSocketNetwork } from "@collabs/ws-client";
import React, { useEffect, useRef, useState } from "react";
import { RecipeComponent, RecipeDoc } from "./recipe-component";

/**
 * React component that loads a RecipeDoc from the given docID,
 * using the given providers.
 *
 * This component also hides the recipe GUI until the doc's
 * initial load. That way, users don't see a confusing blank recipe.
 */
export function Loader({
  docID,
  wsNetwork,
}: {
  docID: string;
  wsNetwork: WebSocketNetwork;
}) {
  // Wait to show the current doc until it's loaded from the server.
  // In a real app, you would probably instead wait until it's loaded
  // from on-device storage.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    return wsNetwork.on("Load", (e) => {
      if (e.doc === docRef.current) setLoaded(true);
    });
  }, []);

  // When docID changes, create the doc and subscribe it to providers.
  const docRef = useRef<RecipeDoc | null>(null);
  useEffect(() => {
    setLoaded(false);
    docRef.current = new RecipeDoc();
    wsNetwork.subscribe(docRef.current, docID);
  }, [docID]);

  if (loaded && docRef.current !== null) {
    return <RecipeComponent doc={docRef.current} />;
  } else return <p>Loading...</p>;
}
