import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import {
  AlertDialog,
  Box,
  Button,
  Dialog,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";

import BetCard from "../../home/BetCard";
import { betSchema } from "../../../validationSchema";
import ErrorMessage from "../../../components/ErrorMessage";
import SelectInput from "../../../components/SelectInput";
import {
  fetchBets,
  getaddBetError,
  getaddBetStatus,
} from "../../../store/slices/betsSlice";
import { BASEURL } from "../../auth/auth";

const BASE_URL = BASEURL + "bets/";

const EditBetModal = ({ betData, trigerType }) => {
  const dispatch = useDispatch();
  const addBetStatus = useSelector(getaddBetStatus);
  const addBetError = useSelector(getaddBetError);
  const router = useNavigate();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(betSchema),
  });

  const selectOptions = [
    { label: "Success", value: "SUCCESS" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Lost", value: "LOST" },
  ];

  const submitForm = handleSubmit(async (data) => {
    console.log(data);
    const betFormData = Object.entries(data).reduce(
      (a, [k, v]) => (v === "" ? a : ((a[k] = v), a)),
      {}
    );

    // const { error, meta, payload } = await dispatch(
    //   updateBet(betData.id, betFormData)
    // );

    // if (error) {
    //   setError(error?.message);
    //   return;
    // }

    // if (meta.requestStatus === "fulfilled") {
    //   toast.success("Bet updated successful");
    //   console.log(payload);
    //   reset();
    //   setOpen(false);
    // }

    try {
      setIsSubmitting(true);

      await axios.put(BASE_URL + betData.id + "/", betFormData);

      toast.success("Bet updated successful");

      reset();
      setOpen(false);
      setIsSubmitting(false);
      dispatch(fetchBets());
    } catch (error) {
      setIsSubmitting(false);
      setError(true);
    }
  });

  const deleteBet = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the bet"
      );

      if (!confirmDelete) return;

      setIsDeleting(true);

      await axios.delete(BASE_URL + betData.id + "/");

      toast.success("Bet deleted successful");

      reset();
      setOpen(false);
      setIsDeleting(false);

      dispatch(fetchBets());
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            The operation was not successful.
          </AlertDialog.Description>
          <Flex mt={"4"} justify={"between"}>
            <Button className="bg-none" onClick={() => setError(false)}>
              Ok
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          {trigerType === "bet-card" ? (
            <Box>
              <BetCard betData={betData} />
            </Box>
          ) : (
            <span className="nav--link2">{betData.home_team}</span>
          )}
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Edit Bet</Dialog.Title>

          <form onSubmit={submitForm}>
            <Flex direction="column" gap="5">
              <Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
                <label>
                  <Text as="div" size="2" mb="1">
                    Home Team
                  </Text>
                  <TextField.Root
                    defaultValue={betData.home_team}
                    placeholder=""
                    {...register("home_team")}
                  />
                  <ErrorMessage> {errors.home_team?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Away Team
                  </Text>
                  <TextField.Root
                    defaultValue={betData.away_team}
                    placeholder=""
                    {...register("away_team")}
                  />
                  <ErrorMessage> {errors.away_team?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Bet Event
                  </Text>
                  <TextField.Root
                    defaultValue={betData.bet}
                    placeholder=""
                    {...register("bet")}
                  />
                  <ErrorMessage> {errors.bet?.message}</ErrorMessage>
                </label>
              </Flex>

              <Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
                <label>
                  <Text as="div" size="2" mb="1">
                    Odd
                  </Text>
                  <TextField.Root
                    defaultValue={parseFloat(betData.odd.toString())}
                    type="number"
                    step=".01"
                    {...register("odd")}
                  />
                  <ErrorMessage> {errors.odd?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Match Time
                  </Text>
                  <TextField.Root
                    type="datetime-local"
                    {...register("match_time")}
                    defaultValue={moment(betData.match_time).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                  />
                  <ErrorMessage> {errors.match_time?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    Bet Status
                  </Text>

                  <SelectInput
                    selectOptions={selectOptions}
                    defaultValue={betData.bet_status}
                    register={register("bet_status")}
                  />

                  <ErrorMessage> {errors.bet_status?.message}</ErrorMessage>
                </label>
              </Flex>

              <Separator color="gray" size="4" my={"3"} />

              <Flex gap={"3"} direction={{ initial: "column", md: "row" }}>
                <label>
                  <Text as="div" size="2" mb="1">
                    HT Score Home
                  </Text>
                  <TextField.Root
                    type="number"
                    {...register("ht_home_score")}
                    defaultValue={betData.ht_home_score?.toString()}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    HT Score Away
                  </Text>
                  <TextField.Root
                    type="number"
                    {...register("ht_away_score")}
                    defaultValue={betData.ht_away_score?.toString()}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    FT Score Home
                  </Text>
                  <TextField.Root
                    type="number"
                    {...register("ft_home_score")}
                    defaultValue={betData.ft_home_score?.toString()}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1">
                    FT Score Away
                  </Text>
                  <TextField.Root
                    type="number"
                    {...register("ft_away_score")}
                    defaultValue={betData.ft_away_score?.toString()}
                  />
                </label>
              </Flex>
            </Flex>

            <Flex gap="3" mt="5" justify="between">
              <Box>
                <Button
                  variant="outline"
                  onClick={deleteBet}
                  color="red"
                  type="button"
                  disabled={isSubmitting || isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </Box>
              <Flex gap={"3"}>
                <Dialog.Close>
                  <Button
                    variant="outline"
                    color="gray"
                    onClick={() => reset()}
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
                {/* <Dialog.Close>
                  <Button type="submit">Save</Button>
                </Dialog.Close> */}
                <Button
                  disabled={isSubmitting || isDeleting}
                  variant="outline"
                  type="submit"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default EditBetModal;
